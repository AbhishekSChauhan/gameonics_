class ChangeColumnDefaultToBlogs < ActiveRecord::Migration[6.1]
  def change
    change_column_default :blogs, :is_pinned, false
    change_column_default :blogs, :is_locked, false
    change_column_default :blogs, :published, false
    change_column_default :users, :is_activated, false
  end
end
