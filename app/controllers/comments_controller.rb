class CommentsController < ApplicationController
    before_action :authorized_user?, only: [:create, :update, :destroy]
    # before_action :set_blog
    before_action :set_comment, only: [:show,:update,:destroy]

    # include CurrentUserConcern

    def index
        all_comments = Comment.all
        comments = all_comments.where(blog_id: params[:blog_id]).order(created_at: :desc)
        like_comments = comments.as_json(include: :likes)
        # like_comments = comments.map{|comment| comment.attributes.except('updated_at','created_at')
        #                             .merge({likes: comment.likes})
        #                             }
        render json:{comments: like_comments}
    end

    def show
        render json:{comment: @comment}
    end

    def create
        # return if suspended(@current_user.can_comment_date)

        comment = @current_user.comments.new(content: params[:newComment],blog_id: params[:blog_id])
        
        # if authorized?
            if comment.save
                render json: {comment: comment,
                            notice:"Comment successfully posted"}, status: :ok
            else
                errors = comment.errors.full_messages
                render json: {error: errors}, status: 422
            end  
            # CommentMailer.new_comment(comment).deliver_now
        # end
    end

    def update
        if authorized?
            if @comment.update(comment_params)
                render status: :ok, 
                        json: {comment: @comment, notice:"Comment successfully updated"}
            else
                render status: :unprocessable_entity,
                    json: {errors: @comment.errors.full_messages.to_sentence}
            end 
            else
            handle_unauthorized
        end         
    end

    def destroy
        if authorized?
            if @comment.destroy
                render status: :ok, 
                json: {notice:'Comment deleted'}
            else
                render status: :unprocessable_entity,
                json: {errors: @comment.errors.full_messages.to_sentence}
            end 
            else
            handle_unauthorized
        end
    end

    private

    def set_blog
        @blog = Blog.find(params[:comment][:blog_id])
    end

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def comment_params
        params.require(:comment).permit(:content,:blog_id)
    end

    def suspended(date)
        if data > DateTime.now 
            json_response(errors: ['Your commenting communications
                                    are still suspended'])
            return true
        end
        false
    end

    # Only allow the owner of the post or an administrator to destroy/update the post

    def authorized?
        # @blog.user == @current_user ||  @current_user.admin_level >= 1
        @comment.user_id == current_user.id || current_user.admin_level >= 1
    end

    def handle_unauthorized
        unless authorized?
        render json:{notice:"Not authorized to perform this task"}, status:401
        end
    end

end
