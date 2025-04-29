FactoryBot.define do
  factory :user do
    nickname                {'太郎'}
    email                   {Faker::Internet.email}
    password                {'123abc'}
    password_confirmation   {password}
  end
end