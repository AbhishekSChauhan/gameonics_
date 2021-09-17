class CommentsController < ApplicationController
    before_action :authorized_user?, except: [:show]
    before_action :set_blog, only: [:show, :create, :update, :destroy]
    before_action :set_comment, only: [:show,:update,:destroy]

    # include CurrentUserConcern

    def show
        render json:{comment: @comment}
    end

    def create
        # return if suspended(@current_user.can_comment_date)

        # comment = @current_user.comments.new(content: params[:newComment],blog_id: params[:blog_id])
        comment = @blog.comments.build(comment_params)
        # comment = @current_user.comments.new(comment_params.merge(blog_id: params[:blog_id]))


        if comment.save
            render json: {comment: comment,
                         comments: Blog.author_comments_json(@blog.comments),
                         notice:"Comment successfully posted"}, status: :ok
        else
            errors = comment.errors.full_messages
            render json: {error: errors}, status: 422
        end       
        
    end

    def update
        # Only allow the owner of the post or an administrator to update the post
        unless @blog.user == @current_user || @current_user.admin_level >= 1
            render json:{errors: 'Not authorized to perform this task'}, status:401
        end

        if @comment.update(comment_params)
            render json:{comment: @comment,
                        comments: Blog.author_comments_json(@blog.comments)}
        else
            errors = comment.errors.full_messages.to_sentence
            render json: {error: errors}, status: 422
        end
    end

    def destroy
        # Only allow the owner of the post or an administrator to update the post
        unless @blog.user == @current_user || @current_user.admin_level >= 1
            render json:{errors: 'Not authorized to perform this task'}, status:401
        end
        
        comment.destroy
        render status: :ok, json: {message:'Comment deleted',
                                   comments: Blog.author_comments_json(@blog.comments)}
    end

    private

    def set_blog
        @blog = Blog.find(params[:comment][:blog_id])
    end

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def comment_params
        params.require(:comment).permit(:content, :comment_id, :user_id)
    end

    def suspended(date)
        if data > DateTime.now 
            json_response(errors: ['Your commenting communications
                                    are still suspended'])
            return true
        end
        false
    end


end
