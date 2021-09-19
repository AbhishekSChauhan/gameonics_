module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_user
    end

    def set_current_user
        if session[:token]
            @current_user = User.find_by(token: session[:token])
        end
    end

end