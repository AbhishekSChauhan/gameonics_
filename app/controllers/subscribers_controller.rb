class SubscribersController < ApplicationController
    before_action :set_subscriber, only: %i[ show ]

    def new
        @subscriber = Subscriber.new
    end
   
    def create
        # subscribed = Subscriber.find_by(email: params[:email])
        if subscribed?
            handle_subscribed           
        else
            @subscriber = Subscriber.new(subscriber_params)    
            if @subscriber.save
                SubscriptionWorker.perform_async(@subscriber.email)
                render json: {notice: "Subscriber was successfully created.",subscriber: @subscriber}, status: :created
            else
                render json:{ errors: @subscriber.errors}, status: :unprocessable_entity
            end
        end
    end

    private

    def subscribed?
        Subscriber.find_by(email: params[:email])
    end

    def handle_subscribed
        render json:{notice:"You have already subscribed for weekly newsletter"}, status:200
    end

    def set_subscriber
        @subscriber = Subscriber.find(params[:id])
    end

    def subscriber_params
        params.require(:subscriber).permit(:email)
    end
end
