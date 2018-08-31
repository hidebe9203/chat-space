 FactoryBot.define do
  factory :user do
    password = 12345678
    name "yamada"
    email "a@a.com"
    password password
    password_confirmation password
  end
end
