ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :username, :email, :password_digest, :admin_level, :is_activated, :activation_key, :token, :token_date, :password_reset_token, :password_reset_date, :can_post_date, :can_comment_date, :likeable_count, :blogs_count, :comments_count, :bookmarks_count
  #
  # or
  #
  # permit_params do
  #   permitted = [:username, :email, :password_digest, :admin_level, :is_activated, :activation_key, :token, :token_date, :password_reset_token, :password_reset_date, :can_post_date, :can_comment_date, :likeable_count, :blogs_count, :comments_count, :bookmarks_count]
  #   permitted << :other if params[:action] == 'create' && current_user.admin_level.positive?
  #   permitted
  # end
  
end
