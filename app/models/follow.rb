class Follow < ApplicationRecord
    # The user giving the follow
    belongs_to :follower, foreign_key: :follower_id, class_name: 'User'
   
    # The user being followed
    belongs_to :followed, foreign_key: :followed_id, class_name: 'User'

    validates :follower_id, presence: true, uniqueness: {scope: :followed_id}
    validates :followed_id, presence: true, uniqueness: {scope: :follower_id}
end

# the follower_id column saves the ID of the user instance 
# who is giving the other user a follow 
#i.e. follower_id = current_user

# the followed_id will save the ID of the user 
# who is being followed. 
# i.e. followed_id = selected_user
#
