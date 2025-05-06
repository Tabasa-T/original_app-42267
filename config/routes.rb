Rails.application.routes.draw do
  devise_for :users
  root "home#index"
  resources :posts
  get 'mypage', to: 'posts#mypage', as: 'mypage'
end
