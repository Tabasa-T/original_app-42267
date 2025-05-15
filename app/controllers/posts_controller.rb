class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :mypage]
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  
  def index
    @posts = Post.all.order('created_at DESC')
  end
  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show

  end

  def edit

  end

  def update
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    
    case params[:from]
    when 'mypage'
      redirect_to mypage_path, notice: '投稿を削除しました'
    else
      redirect_to posts_path, notice: '投稿を削除しました'
    end
  end

  def mypage
    @posts = current_user.posts.order(created_at: :desc)
    @total_duration = current_user.posts.sum(:duration) || 0
    @daily_durations = current_user.posts
    .where(created_at: 15.days.ago..Time.current)
    .group_by_day(:created_at)
    .sum(:duration)
  end

  private

  def post_params
    params.require(:post).permit(:duration, :result, :image).merge(user_id: current_user.id)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
