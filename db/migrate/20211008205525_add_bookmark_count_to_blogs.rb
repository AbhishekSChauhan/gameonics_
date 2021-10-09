class AddBookmarkCountToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :bookmarks_count, :integer
  end
end
