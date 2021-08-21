class User < ApplicationRecord
    has_secure_password

    validates_presence_of :username,:email
    validates_uniqueness_of :username,:email

    validates_length_of :username, in: 4..30
    
    validates :password, :password_confirmation, presence: true, on: :create
    validates :password, confirmation: true
    
    has_one_attached :avatar
    has_many :blogs
    has_many :comments

end
