class AddSlugToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :slug, :string
  end
end
