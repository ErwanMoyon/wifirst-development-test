Rails.application.routes.draw do
  # root "front/sessions#new"
  root "front/home#index"

  scope module: :front do
    resources :home, only: %i[index]
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :settings, only: %i[create show]
      resources :user_token, only: %i[create]
    end
  end
end
