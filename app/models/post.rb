class Post < ApplicationRecord

  belongs_to :user
  has_one_attached :image
  
  with_options presence: true do
    validates :duration, :result, :user_id
  end

  validates :duration, numericality: {only_integer: true, message: "は半角数字（整数）で入力してください"}
end
