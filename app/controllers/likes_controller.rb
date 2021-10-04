class LikesController < ApplicationController
    before_action :authorized_user?
    def create
        @like = Like.new(like_params.merge(user_id: current_user.id))
        if @like.save
            render json: {like: @like, notice:"Thanks for liking!"}, status: :ok
        else
            render json: {errors:@like.errors.full_messages.to_sentence}
        end 
    end

    def destroy
        @like = current_user.likes.find(params[:id])
        @like.destroy
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
    end
end