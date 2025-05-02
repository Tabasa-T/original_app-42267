require 'rails_helper'

RSpec.describe Post, type: :model do

  before do
    @user = FactoryBot.create(:user)
    @post = FactoryBot.build(:post, user_id: @user.id)
  end

  describe '新規投稿' do
    context '新規投稿出来るとき' do
      it '必須項目が全て存在していれば投稿できる' do
        expect(@post).to be_valid
      end
      it 'imageが空でも投稿できる' do
        @post.image = nil
        expect(@post).to be_valid
      end
    end
    context '新規投稿できないとき' do
      it 'durationが空では投稿できない' do
        @post.duration = ''
        @post.valid?
        expect(@post.errors.full_messages).to include("達成にかかった時間 を入力してください", "達成にかかった時間 は半角数字（整数）で入力してください")
      end
      it 'durationが半角数字でなければ投稿できない' do
        @post.duration = "１００"
        @post.valid?
        expect(@post.errors.full_messages).to include("達成にかかった時間 は半角数字（整数）で入力してください")
      end
      it 'resultが空では登録できない' do
        @post.result = ''
        @post.valid?
        expect(@post.errors.full_messages).to include("成し遂げたこと を入力してください")
      end
      it 'userが紐づいていなければ投稿できない' do
        @post.user = nil
        @post.valid?
        expect(@post.errors.full_messages).to include('User を入力してください')
      end
    end
  end
end
