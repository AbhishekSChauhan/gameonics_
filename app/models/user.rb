class User < ApplicationRecord
    has_secure_password
    has_many :blogs, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :bookmarks, dependent: :destroy

    # returns an array of follows a user gave to someone else
    has_many :given_follows, class_name: 'Follow', foreign_key: :follower_id, dependent: :destroy
    # returns an array of other users who the user has followed
    has_many :followings, through: :given_follows, source: :followed

    # Will return an array of follows for the given user instance
    has_many :received_follows, class_name: 'Follow', foreign_key: :followed_id, dependent: :destroy

    # Will return an array of users who follow the user instance
    has_many :followers, through: :received_follows, source: :follower

    validates :username, length: {in: 4..32 }, presence: true,
                        uniqueness: {case_sensitive: true}

    
    VALID_EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i.freeze
    

    validates :email, length:{maximum:255}, presence: true,
                        uniqueness: {case_sensitive: false},
                        format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
    
    validates :password, length: {minimum: 8}, presence: true
    validates :password, confirmation: true


    validates :admin_level, numericality: { only_integer: true,
                                          less_than_or_equal_to: 3 }
    
    has_one_attached :profile_image

    before_save { username.downcase! }
    before_save { email.downcase! }  

    def password_token_expired?
        offset = (Time.zone.now - password_reset_date).round
        offset / 1.hours >= 1 # Token expires after 1 hour
    end

end
