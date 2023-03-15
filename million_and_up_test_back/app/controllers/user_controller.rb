class UserController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        user = User.new(
            email: params[:email], 
            password: params[:password], 
            password_confirmation: params[:password], 
            name: params[:name]
        )     

        if user.save
            render json: {
                user: user,
                status: "create"
            }
        else
            render json: {
                user: {},
                status: "error",
                message: user.errors.full_messages[0]
            }        
        end
    end

    def get
        user = User.find_by(id: params[:userId])

        render json: user
    end
end
