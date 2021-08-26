class AddTokenToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :is_activated, :boolean
    add_column :users, :activation_key, :string
    add_column :users, :token, :string
    add_column :users, :token_date, :datetime
    add_column :users, :password_reset_token, :string
    add_column :users, :password_reset_date, :datetime
    add_column :users, :can_post_date, :datetime
    add_column :users, :can_comment_date, :datetime
  end
end
