Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :sessions, only: [:create]

  get "/migrate_product", to: "product#migrate_product"
  post "/list_products", to: "product#list_products"
  post "/categories", to: "product#categories"
  post "/category_by_name", to: "product#category_by_name"
  post "/category_by_id", to: "product#category_by_id"
  post "/product_detail", to: "product#product_detail"
  post "/user/create", to: "user#create"
  post "/session/create", to: "sessions#create"
  post "/order/create", to: "order#create"
end
                                                                