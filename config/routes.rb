Rails.application.routes.draw do
  devise_for :users
  root "posts#index"
  resources :posts
  get 'mypage', to: 'posts#index', as: 'mypage'
end
