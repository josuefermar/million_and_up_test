class ProductController < ApplicationController
    skip_before_action :verify_authenticity_token

    def migrate_product
        Product.migrate_data
        render plain: "Data migration finish."
    end

    def list_products
        page = params[:page].to_i
        limit = params[:limit].to_i

        products = Product.all

        if !params[:categoryId].nil?
            products = products.filter_by_category(params[:categoryId].to_i)
        end
        if !params[:query].nil?
            products = products.filter_by_query(params[:query].to_s)
        end

        if !params[:minPrice].nil?
            products = products.filter_by_min_price(params[:minPrice].to_f)
        end

        if !params[:maxPrice].nil?
            products = products.filter_by_max_price(params[:maxPrice].to_f)
        end
        
        products = products.paginate(:page => page, :per_page => limit).to_a

        if !params[:total].nil?
            render text: products.total_entries
        end
        
        render json: products
    end

    def product_detail
        id_origin = params[:idOrigin]
        product = Product.where(id_origin: id_origin).first
        render json: product
    end

    def categories
        categories = Category.all.to_a
        render json: categories
    end

    def category_by_name
        name = params[:name]
        category = Category.where(name: name).first
        render json: category
    end

    def category_by_id
        id = params[:id]
        category = Category.where(id: id).first
        render json: category
    end
end
