class HomeController < ApplicationController
    def index
        products = Product.all.to_a
        render json: products
    end
end
