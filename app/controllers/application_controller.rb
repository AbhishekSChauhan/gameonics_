class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    before_action :current_user
    # include CurrentUserConcern
    include ExceptionHandlerConcern
    include TokenGenerator
    include CompareDates

    def authorized_user?
        render json: { notice: 'Please log in to continue' }, status: :unauthorized unless current_user
    end

    def authorized_admin?        
        authorized_user?
        render json: { errors: 'Insufficient Administrative Rights' }, status: 401 unless current_user.admin_level.positive?
    end

    private

    def current_user        
        if session[:user_id]
            @current_user = User.find(session[:user_id])
        end
    end

    def token_expire?(token_date, days = 1, hours = 24, minutes = 0, seconds = 0)
        date_diff = compare_dates(token_date)

        if date_diff[:days] >= days && date_diff[:hrs] >=hours &&
            date_diff[:mins] >= minutes && date_diff[:secs] >=seconds
            true
        end
        false
    end

end
