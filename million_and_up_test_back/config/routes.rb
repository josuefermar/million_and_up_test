Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/migrate_product", to: "product#migrate_product"
  post "/list_products", to: "product#list_products"
  post "/categories", to: "product#categories"
end
                                                                