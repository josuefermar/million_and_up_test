class AddForeignKeyProductCategory < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :category
    add_column :products, :category_id, :integer
    add_foreign_key :products, :categories, column: :category_id, primary_key: :id
    add_index :categories, :name, unique: true
    add_index :products, :id_origin, unique: true
  end
end
