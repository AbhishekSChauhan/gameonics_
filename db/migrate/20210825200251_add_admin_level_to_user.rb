class AddAdminLevelToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :admin_level, :integer
  end
end
