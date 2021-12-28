class AddLikeableCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :likeable_count, :integer
  end
end
