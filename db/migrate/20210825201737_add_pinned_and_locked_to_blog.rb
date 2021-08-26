class AddPinnedAndLockedToBlog < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :is_pinned, :boolean
    add_column :blogs, :is_locked, :boolean
  end
end
