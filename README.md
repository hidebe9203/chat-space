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

|Column     |Type    |Options                        |
|-----------|--------|-------------------------------|
|id         |integer |null: false, primary key: true |
|name       |string  |null: false, unique: true      |
|email      |text    |null: false, unique: true      |
|password   |text    |null: false                    |
|created_at |date    |null: false                    |
|updated_at |date    |null: false                    |

### Assosiation
- has_many :users_groups
- has_many :messages

## users_groupsテーブル

|Column     |Type    |Options                        |
|-----------|--------|-------------------------------|
|id         |integer |null: false, primary key: true |
|user_id    |integer |null: false, foreign_key: true |
|group_id   |integer |null: false, foreign_key: true |
|created_at |date    |null: false                    |
|updated_at |date    |null: false                    |

### Assosiation
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column     |Type    |Options                        |
|-----------|--------|-------------------------------|
|id         |integer |null: false, primary key: true |
|group_name |string  |null: false, unique: true      |
|created_at |date    |null: false                    |
|updated_at |date    |null: false                    |


### Assosiation
- has_many :users_groups
- has_many :messages

## messagesテーブル

|Column     |Type    |Options                        |
|-----------|--------|-------------------------------|
|id         |integer |null: false, primary key: true |
|user_id    |integer |null: false, foreign_key: true |
|group_id   |integer |null: false, foreign_key: true |
|body       |text    |　　　　　　　　　　　　　　　　　　 |
|image      |text    |　　　　　　　　　　　　　　　　　　 |
|created_at |date    |null: false                    |
|updated_at |date    |null: false                    |

### Assosiation
- belongs_to :user
- belongs_to :group
