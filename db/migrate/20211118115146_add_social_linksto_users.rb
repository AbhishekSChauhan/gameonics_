class AddSocialLinkstoUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :facebook_url, :string
    add_column :users, :twitter_url, :string
    add_column :users, :instagram_url, :string
  end
end
