class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:create, :destroy]

  def create
    @post.likes.create(user: current_user)
    redirect_back fallback_location: post_path(@post)
  end

  def destroy
    like = @post.likes.find_by(user: current_user)
    like.destroy if like
    redirect_back fallback_location: posts_path(@post)
  end

  def index
    @liked_posts = current_user.liked_posts.order(created_at: :desc)
  end


  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
