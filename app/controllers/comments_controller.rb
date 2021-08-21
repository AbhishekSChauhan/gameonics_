class CommentsController < ApplicationController
    before_action :set_comment, only: [:destroy]

    include CurrentUserConcern

    def create
        comment = @current_user.comments.new(content: params[:newComment],blog_id: params[:blog_id])

        if @current_user
            if comment.save
                render json: {comment: comment, notice:"Comment successfully posted"}, status: :ok
            else
                errors = @comment.errors.full_messages.to_sentence
                render json: {error: errors}, status: 422
            end
        else
            render json:{notice:"Login to comment"}
        end        
        
    end

    def destroy
        if comment.destroy
            render status: :ok, json: {}
        else
            render json: {error: @comment.errors.full_messages.to_sentence}, status: 422
        end
    end

    private

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def comment_params
        params.require(:comment).permit(:content, :blog_id)
    end

end
