FactoryBot.define do
  factory :post do
    duration {100}
    result   {"富士山登頂"}
    association :user
  end
end
