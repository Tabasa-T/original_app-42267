class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  with_options presence: true do
    validates :nickname, length: {maximum: 15}
    validates :password, format: { 
                          with: /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i, 
                          message: 'は半角英数字混合で入力してください' 
                         }, on: :create
  end
end
