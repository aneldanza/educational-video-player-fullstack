Rails.application.routes.draw do
  # get 'homepage/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "homepage#index"

  namespace :api, defaults: {format: :json} do
      resources :videos, only: [:index, :create, :show]
  end

  match '*path', to: 'homepage#index', via: :get
end
