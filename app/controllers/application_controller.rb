class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    include CurrentUserConcern

    def authenticate
        render json: { message: 'Please log in' }, status: :unauthorized unless @current_user
    end

end
