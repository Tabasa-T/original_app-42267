# README

## テーブル設計

## usersテーブル

|Column            |Type  |Options                   |
|------------------|------|--------------------------|
|nickname          |string|null: false, maxlength: 15|
|email             |string|null: false, unique: true |
|encrypted_password|string|null: false               |

### association

-has_many :posts


## postsテーブル

|Column|Type      |Options    |
|------|----------|-----------|
|time  |integer   |null: false|
|result|text      |null: false|
|user  |references|null: false|

### Association

-belongs_to :user
-has_one_attached :image