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
      patch :lock_post, to: 'posts#lock_post'
      patch :pin_post, to: 'posts#pin_post'
    end
    resources :comments, only: [:create]
    # member do
    #   # get :get_comments
    # end
  end

  
  

end
