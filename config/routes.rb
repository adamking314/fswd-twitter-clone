Rails.application.routes.draw do
  root 'static_pages#home'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :tweets, only: [:index, :create, :destroy]

    # USERS
    post '/users'                  => 'users#create'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end

  get '/feed' =>'static_pages#feed'
  get'/:username' => 'static_pages#user_page'
  get '/user_page' => 'static_pages#user_page'
  get '/login' => 'static_pages#login'


  #get '*path' => 'static_pages#home'
  # if you are using active storage to upload and store images, comment the above line
end
