class BlogsController < ApplicationController

  before_action :set_blog, only: [:show, :update, :destroy]
  before_action :authenticate, only: [:create, :update, :destroy]

  def index
    # @blogs = Blog.where user: @user.id
    @blogs = Blog.all
    render json: { blogs: @blogs },status: :ok

  end

  def show
    blog_creator = User.find(@blog.user_id)
    render status: :ok, json: {blog: @blog, blog_creator:blog_creator}
  end

  def create
    @blog = Blog.new(blog_params.merge(user_id: @current_user.id))
    # @blog.user = @user

    if @blog.save
      render status: :ok,
        json: {notice: "Blog Successfully created"}
    else
      errors= @blog.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: {errors:errors}
    end
  end

  def update
    if @blog.update(blog_params)
      render status: :ok, 
        json: @blog
    else
      render status: :unprocessable_entity,
        json: {errors: @blog.errors.full_messages.to_sentence}
    end
  end

  def destroy
    if @blog.destroy
      render status: :ok, 
        json: {notice:'Blog deleted'}
    else
      render status: :unprocessable_entity,
        json: {errors: @blog.errors.full_messages.to_sentence}
    end
  end

  
  def get_comments
    comments = @blog.comments.select("comments.*, users.name").joins(:user),by_created_at
    render json: {comments: comments}
  end

  private 

  def set_blog
    @blog = Blog.find(params[:id])
  end
  # Only allow a list of trusted parameters through.
  def blog_params
    params.require(:blog).permit(:title, :body)
  end
end
