class CreateProductsOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :products_orders do |t|
      t.belongs_to :order, foreign_key: true
      t.belongs_to :product, foreign_key: true
      t.integer :quantity
      t.decimal :price
      t.timestamps
    end
  end
end
