Rails.application.routes.draw do
  get 'markdown/index'

  resources :articles do
    resources :comments
  end
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
