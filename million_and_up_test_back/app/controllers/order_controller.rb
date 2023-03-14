class OrderController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        begin
            order = Order.create(
                user_id: params[:userId],
                price: 0
            )
    
            items = params[:data]
            total_price = 0
    
            items.each do |item|
                total_price += item[:quantity].to_i * item[:price].to_f
    
                product_order = ProductsOrder.create(
                    order_id: order.id,
                    product_id: item[:product_id],
                    quantity: item[:quantity],
                    price: item[:price]
                )
                product_order.save
            end
    
            order.update(price: total_price)
            render json: {
                status: "success"
            } 
        rescue => exception
            render json: {
                status: "success",
                message: exception.message
            } 
        end
    end
end
