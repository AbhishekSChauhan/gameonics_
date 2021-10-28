Rails.application.routes.draw do
 
  root to: "home#index"
  # get '*path', to: 'home#index', via: :all

  ###    Authentication routes    ####
  resources :sessions, only: [:create] 
  resources :registrations, only: [:create] 
  delete :logout, to: "sessions#destroy" 
  get :logged_in, to: "sessions#logged_in"
  
  get '/activate_account',
      to: 'registrations#activate_account',
      as: 'activate_account'
  
  get '/reset_password',
      to: 'registration#password_reset_account',
      as: 'reset_password'

  patch :forgot_password, to: 'registrations#forgot_password'
  patch :change_password, to: 'registrations#change_password'
  patch :change_password_with_token, to: 'registrations#change_password_with_token' 

  ###   Blogs and comments routes  ###
  resources :blogs, param: :slug do
    member do
      get :preview, to: 'blogs#preview'
      patch :lock_post, to: 'blogs#lock_post'
      patch :pin_post, to: 'blogs#pin_post'
      patch :published, to: 'blogs#published'
      patch :banner_image, to: 'blogs#banner_image'
    end
  end

  resources :blogs, only: [:index] do
    resources :comments
  end

  resources :likes, only: [:create, :destroy]
  resources :bookmarks, only: [:create, :destroy, :index, :show]

  get 'tags/:tag', to: 'blogs#index', as: 'tag'
  
  ### Users ###
  resources :users, param: :username do
    member do
      patch :update_image, to: 'users#update_image'
      patch :set_admin_level, to: 'users#set_admin_level'
      patch :suspend_comms, to: 'users#suspend_communication'
      post :follow, to: 'users#follow'
      post :unfollow, to: 'users#unfollow'
      get :followers, to: 'users#followers'
      get :following, to: 'users#following'
    end
  end

  ActiveAdmin.routes(self)


end
