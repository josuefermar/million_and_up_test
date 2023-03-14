class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def create
        user = User
                .find_by(email: params[:email])
                .try(:authenticate, params[:password])
        if user
            render json: {
                status: "success",
                user: user
            }
        else
            render json: {
                status: "error",
                user: {},
                message: "Correo o contraseña invalido"
            }
        end
    end
end
