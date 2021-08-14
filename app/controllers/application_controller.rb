class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    include CurrentUserConcern

    def authenticate
        if @current_user
            render json:{ message:"Logged in" }
        else
            render json: { message: "Please Log in" }
        end
    end

end
