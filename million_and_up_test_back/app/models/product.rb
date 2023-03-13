class Product < ApplicationRecord
    belongs_to :category
    
    require 'uri'
    require 'net/http'

    def self.migrate_data
        dummy_products = self.get_api_products('dummy')
        fakestore_products = self.get_api_products('fakestore')
        products = dummy_products + fakestore_products
        
        categories = products.map{|product|
            {name: product[:category].capitalize}
        }

        categories = categories.uniq

        Category.migrate_data(categories)
        
        products = self.update_products_categories(products)
        
        self.save_api_products products
    end

    private
    def self.get_api_products(origin = 'dummy')

        url = origin == 'fakestore' ? 
            'https://fakestoreapi.com/products' : 
            'https://dummyjson.com/products?limit=100'
            
        uri = URI(url)
        res = Net::HTTP.get_response(uri)

        return origin == 'fakestore' ?  
            self.map_fakestore_products(JSON.parse(res.body)) : 
            self.map_dummy_products(JSON.parse(res.body))
    end

    def self.save_api_products(products)
        Product.upsert_all(products)
    end

    def self.map_dummy_products(data)
        return data["products"].map{
            |product_data|
            {
                name: product_data["title"],
                description: product_data["description"],
                rating: product_data["rating"],
                category: product_data["category"],
                stock:  product_data["stock"],
                price:  product_data["price"],
                image:  product_data["images"][0],
                id_origin: "#{product_data["id"]}-dummy"
            }
        }
    end

    def self.map_fakestore_products(data)
        return data.map{
            |product_data|
            {
                name: product_data["title"],
                description: product_data["description"],
                rating: product_data["rating"]["rate"],
                category: product_data["category"],
                stock:  0,
                price:  product_data["price"],
                image:  product_data["image"],
                id_origin: "#{product_data["id"]}-fakestore"
            }
        }
    end

    def self.update_products_categories(products)
        categories = Category.all.to_a

        return products.each{
            |product|

            category_id = categories.select{|c| c.name == product[:category].capitalize}
            product[:category_id] = category_id.first.id
            product.delete(:category)
        }        
    end

end
