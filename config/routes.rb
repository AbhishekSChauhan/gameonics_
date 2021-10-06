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
  
  get '/password_reset_account',
      to: 'registration#password_reset_account',
      as: 'reset_password'

  patch :forgot_password, to: 'registrations#forgot_password'
  patch :change_password, to: 'registrations#change_password'
  patch :change_password_with_token, to: 'registrations#change_password_with_token' 

  ###   Blogs and comments routes  ###
  resources :blogs do
    member do
      get :preview, to: 'blogs#preview'
      patch :lock_post, to: 'blogs#lock_post'
      patch :pin_post, to: 'blogs#pin_post'
      patch :published, to: 'blogs#published'
      patch :banner_image, to: 'blogs#banner_image'
    end
    resources :comments
  end

  resources :likes, only: [:create, :destroy]
  resources :bookmarks, only: [:create, :destroy]

  resources :users, only: %i[index show] do
    member do
      patch :update_image, to: 'users#update_image'
      patch :set_admin_level, to: 'users#set_admin_level'
      patch :suspend_comms, to: 'users#suspend_communication'
    end
  end

  resources :users, only: %i[index show] do
    member do
      patch :update_image, to: 'users#update_image'
      patch :set_admin_level, to: 'users#set_admin_level'
      patch :suspend_comms, to: 'users#suspend_communication'
    end
  end

  
  

end
