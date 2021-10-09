class AddBlogCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :blogs_count, :integer
  end
end
