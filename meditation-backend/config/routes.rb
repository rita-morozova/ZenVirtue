Rails.application.routes.draw do
  resources :quotes
  resources :notes
  resources :meditations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
