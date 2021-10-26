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
    
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

    validates :email, length:{maximum:255}, presence: true,
                        uniqueness: {case_sensitive: false},
                        format:{with: VALID_EMAIL_REGEX }
    
    validates :password, length: {minimum: 8}, presence: true, on: :create
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

    # #Follows a user
    # def follow(other_user)
    #     given_follows.create(followed_id: other_user.id)
    # end

    # #Unfollows a user
    # def unfollow(other_user)
    #     given_follows.find_by(followed_id: other_user.id).destroy
    # end

    # # Returns true if the current user is following the other user.
    # def following?(other_user)
    #     following.include?(other_user)
    # end

end
