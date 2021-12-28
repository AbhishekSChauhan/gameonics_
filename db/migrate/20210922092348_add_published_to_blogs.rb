class AddPublishedToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :published, :boolean
    add_column :blogs, :published_at, :datetime
  end
end
