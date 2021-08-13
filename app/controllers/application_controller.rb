class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    include CurrentUserConcern

    def authorized
        if @current_user
            render json:{ notice:"Logged In" }
        else
            render json: { notice: "Please Log in" }
        end
    end
end
