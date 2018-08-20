# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column     |Type    |Options                              |
|-----------|--------|-------------------------------------|
|name       |string  |null: false, unique: true, add_index |
|email      |text    |null: false, unique: true            |
|password   |text    |null: false                          |

### Assosiation
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :messages

## users_groupsテーブル

|Column     |Type       |Options                        |
|-----------|-----------|-------------------------------|
|user_id    |references |null: false, foreign_key: true |
|group_id   |references |null: false, foreign_key: true |

### Assosiation
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column     |Type   |Options                   |
|-----------|-------|--------------------------|
|name       |string |null: false, unique: true |

### Assosiation
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages

## messagesテーブル

|Column     |Type       |Options                        |
|-----------|-----------|-------------------------------|
|user_id    |references |null: false, foreign_key: true |
|group_id   |references |null: false, foreign_key: true |
|body       |text       |　　　　　　　　　　　　　　　　　　 |
|image      |text       |　　　　　　　　　　　　　　　　　　 |

### Assosiation
- belongs_to :user
- belongs_to :group
