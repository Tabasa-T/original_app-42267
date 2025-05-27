Rails.application.routes.draw do
  devise_for :users
  root "home#index"
  resources :posts do
    resource :like, only: [:create, :destroy]
  end
  get 'mypage', to: 'posts#mypage', as: 'mypage'
  get 'liked_posts', to: 'likes#index', as: :liked_posts
end
