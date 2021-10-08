class AddViewsCountToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :views_count, :int
  end
end
