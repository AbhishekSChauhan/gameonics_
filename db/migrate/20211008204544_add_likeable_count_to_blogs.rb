class AddLikeableCountToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :likeable_count, :integer
  end
end
