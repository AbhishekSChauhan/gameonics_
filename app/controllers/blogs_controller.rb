class BlogsController < ApplicationController

  before_action :set_blog, only: [:show, :update, :destroy]
  before_action :authenticate, except: [:index, :show, :get_comments]


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
    render status: :ok, json: { blog: @blog, blog_creator: @blog.user, comments: comments }
  end

  def create
      @blog = Blog.new(blog_params.merge(user_id: @current_user.id))
    #  blog = @current_user.blogs.build(blog_params)
    
    if authorized?
      if @blog.save
        render status: :ok,
              json: {notice: "Blog Successfully created"}
      else
        errors = @blog.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: {error:errors}
      end
    end
  end

  def update
    if authorized?
      if @blog.update(blog_params)
        render status: :ok, 
          json: {blog: @blog, notice:"Blog successfully updated"}
      else
        render status: :unprocessable_entity,
          json: {errors: @blog.errors.full_messages.to_sentence}
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      if @blog.destroy
        render status: :ok, 
          json: {notice:'Blog deleted'}
      else
        render status: :unprocessable_entity,
          json: {errors: @blog.errors.full_messages.to_sentence}
      end
    else
      handle_unauthorized
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
    params.require(:blog).permit(:title,:body,:image)
  end

  def authorized?
    #  @blog.user == @current_user
     @blog.user_id == @current_user.id
  end

  def handle_unauthorized
    unless authorized?
      render json:{notice:"Not authorized to perform this task"}, status:401
    end
  end
  
end
