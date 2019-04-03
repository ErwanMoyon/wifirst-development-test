Rails.application.routes.draw do
  scope module: :front do
    resources :sessions, only: %i[create new]
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :user_token, only: %i[create]
    end
  end
end
