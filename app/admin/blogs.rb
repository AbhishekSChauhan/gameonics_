ActiveAdmin.register Blog do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :body, :user_id, :is_pinned, :is_locked, :published, :published_at, :image, :views_count, :comments_count, :likeable_count, :bookmarks_count, :slug
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :body, :user_id, :is_pinned, :is_locked, :published, :published_at, :image, :views_count, :comments_count, :likeable_count, :bookmarks_count, :slug]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
