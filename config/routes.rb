Rails.application.routes.draw do

  root to: "home#index"
  # get '*path', to: 'home#index', via: :all

  ###    Authentication routes    ####
  resources :sessions, only: [:create] 
  resources :registrations, only: [:create] 
  delete :logout, to: "sessions#logout" 
  get :logged_in, to: "sessions#logged_in"

  ###   Blogs and comments routes  ###
  resources :blogs do
    resources :comments, only: [:create]
    # member do
    #   # get :get_comments
    # end
  end
  

end
