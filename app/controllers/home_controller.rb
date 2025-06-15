class HomeController < ApplicationController
  def index
    @sensational_post = Post.sensational_sample
  end
end
