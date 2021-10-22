ActiveAdmin.register Comment, :as => "BlogComments" do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :content, :blog_id, :user_id, :comment_id, :likeable_count
  #
  # or
  #
  # permit_params do
  #   permitted = [:content, :blog_id, :user_id, :comment_id, :likeable_count]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
