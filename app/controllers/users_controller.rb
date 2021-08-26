class UsersController < ApplicationController

    def show
        json_response(user: user_with_image(@user))
    end

    private

    # Returns a hash object of a user with their profile_image included
    def user_with_image(user)
        user_with_attachment = user.attributes
        user_with_attachment['profile_image'] = nil

        unless user.profile_image_attachment.nil?
            user_with_attachment['profile_image'] = url_for(user.profile_image)
        end
        user_with_attachment
    end
end
