class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post

  def create
    post = Post.find(params[:post_id])
    post.likes.create(user: current_user)
    redirect_back fallback_location: post_path
  end

  def destroy
    post = Post.find(params[:post_id])
    like = post.likes.find_by(user: current_user)
    like.destroy if like
    redirect_back fallback_location: posts_path
  end


  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
