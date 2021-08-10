class User < ApplicationRecord
    has_secure_password

    validates_presence_of :username
    validates_uniqueness_of :username

    validates_presence_of :email
    validates_uniqueness_of :email
    
    validates :password, :password_confirmation, presence: true, on: :create
    validates :password, confirmation: true
    
    has_many :blogs
    has_many :comments

end
