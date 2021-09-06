class BlogsController < ApplicationController

  before_action :set_blog, only: [:show, :update, :destroy, :lock_blog, :pin_blog]
  before_action :authorized_user?, except: [:index, :show, :lock_blog, :pin_blog]
  before_action :authorized_admin?, only: [:lock_blog,:pin_blog]


  def index
    #only current users blogs
    # @blogs = Blog.where(user_id: @current_user.id)
    # @blogs = @current_user.blogs.all    

    #All users blogs
    @blogs = Blog.all
    # @users = User.all 
    render json: { blogs: @blogs },status: :ok

  end

  def show
    # blog_creator = User.find(@blog.user_id)
    comments = @blog.comments.select("comments.*, users.username").joins(:user).by_created_at
    # comments = Blog.author_comments_json(@blog.comments)
    render status: :ok, json: { blog: @blog, blog_creator: @blog.user, comments: comments }
  end

  def create
    return if suspended(@current_user.can_blog_date)

    # @blog = Blog.new(blog_params.merge(user_id: @current_user.id))
    @blog = @current_user.blogs.build(blog_params)
    
    # if authorized?
      if @blog.save
        render status: :ok,
              json: {blog: @blog , notice: "Blog Successfully created"}
      else
        errors = @blog.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: {error:errors}
      end
    # end
  end

  def update
    # Only allow the owner of the post or an administrator to update the post
    unless @blog.user == @current_user || @current_user.admin_level >= 1
      render json:{errors: 'Not authorized to perform this task'}, status:401
    end

    if @blog.update(blog_params)
      render status: :ok, 
                json: {blog: @blog, notice:"Blog successfully updated"}
    else
      render status: :unprocessable_entity,
          json: {errors: @blog.errors.full_messages.to_sentence}
    end
  end

  def destroy
    # Only allow the owner of the post or an administrator to destroy the post
    unless @blog.user == @current_user || @current_user.admin_level >= 1
      render json:{errors: 'Not authorized to perform this task'}, status:401
    end

    if @blog.destroy
      render status: :ok, 
        json: {notice:'Blog deleted'}
    else
      render status: :unprocessable_entity,
        json: {errors: @blog.errors.full_messages.to_sentence}
    end  
  end

  def pin_blog
    if @blog.update(is_pinned: !@blog.is_pinned)
      render json:{blog: @blog}
    else
      render json: {errors: @blog.errors.full_messages.to_sentence}, status: 401
    end
  end

  def lock_blog
    if @blog.update(is_locked: !@blog.is_locked)
      render json:{blog:@blog}
    else
      render json:{errors:@blog.errors.full_messages.to_sentence}, status: 401
    end
  end

  
  # def get_comments
  #   comments = @blog.comments.select("comments.*, users.username").joins(:user).by_created_at
  #   render json: {comments: comments}
  # end

  private 

  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title,:body,:image,:is_pinned, :is_locked)
  end

  def suspended(date)
    if date> DateTime.now
      render json:{errors:['Your posting communications are still suspended']}
      return true
    end
    false
  end

  # def authorized?
  #   #  @blog.user == @current_user
  #    @blog.user_id == @current_user.id
  # end

  # def handle_unauthorized
  #   unless authorized?
  #     render json:{notice:"Not authorized to perform this task"}, status:401
  #   end
  # end
  
end
