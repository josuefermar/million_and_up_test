class ProductController < ApplicationController
    skip_before_action :verify_authenticity_token

    def migrate_product
        Product.migrate_data
        render plain: "Data migration finish."
    end

    def list_products
        products = Product.all.to_a
        render json: products
    end

    def product_detail
        
    end

    def categories
        categories = Category.all.to_a
        render json: categories
    end
end
