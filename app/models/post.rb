class Post < ApplicationRecord

  belongs_to :user
  has_one_attached :image
  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user
  
  with_options presence: true do
    validates :duration, :result, :user_id
  end

  validates :duration, numericality: {only_integer: true, message: "は半角数字（整数）で入力してください"}

  def self.sensational_sample
    Post.left_joins(:likes)
        .group(:id)
        .order('COUNT(likes.id) DESC')
        .limit(5)
        .sample
  end
end
