class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # def render_unprocessable_entity_response(exception)
    #     render json: {error: exception.record.errors}, status: :unprocessable_entity
    # end

    include CurrentUserConcern

    def authenticate
        render json: { notice: 'Please log in to continue' }, status: :unauthorized unless @current_user
    end

end
