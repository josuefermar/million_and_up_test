class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description 
      t.decimal :rating, default: 0
      t.string :category
      t.integer :stock, default: 0
      t.decimal :price, default: 0
      t.string :image
      t.string :id_origin, :unique => true
      t.timestamps
    end
  end
end
