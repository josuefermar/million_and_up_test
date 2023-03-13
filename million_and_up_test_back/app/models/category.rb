class Category < ApplicationRecord
    has_many :products

    def self.migrate_data(data)
        Category.upsert_all(data, unique_by: :name)
    end
end
