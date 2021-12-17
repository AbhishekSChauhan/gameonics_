class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :update, :destroy, :lock_blog, :pin_blog]
  before_action :authorized_user?, except: [:index, :show, :lock_blog, :pin_blog]
  before_action :authorized_admin?, only: [:lock_blog,:pin_blog]
  # impressionist :actions=>[:show,:index]

  def index
    @blogs =  Blog.published
    # all_blogs = @blogs.as_json(include:{user:{only: :username}})
    # render json:  @blogs.as_json(include: :user) , status: :ok
    # render :json => @blogs, :include => {:user => {:only => :username}}
    # data = @blogs.map {|blog| blog.attributes.except('updated_at', 'user_id')
    #                     .merge( {comments: blog.comments}, 
    #                             # {views: blog.impressionist_count(:filter=>:session_hash)},
    #                             {user: blog.user.attributes.except('password_digest', 'created_at', 'email', 'updated_at', 'birthday'), 
    #                             likes: blog.likes.map {|like| like.attributes.except('updated_at')} 
    #                             }
    #                           )
    #                   }
    data = @blogs.as_json(include: {user: {only: [:username,:id, :avatar]}})
    # data = @blogs.includes(:user, :tags)
    tags = @blogs.as_json(include: :tags)
    if params[:tag]
      tagged_blogs = Blog.tagged_with(params[:tag])
      pub_tagged_blogs = tagged_blogs.where(published:true)
      data = pub_tagged_blogs.as_json(include: {user: {only: :username}})
      render json: { blogs: data, tag_count: data.length} , status: :ok
    else
      render json: { blogs: data, tags: tags } , status: :ok
    end


    # render json: { blogs: data} , status: :ok
  end

  def show   
      # comments = @blog.comments.select("comments.*, users.username").joins(:user).by_created_at
      unique_views = impressionist(@blog)
      # unique_views = @blog.impressionist_count(:filter=>:session_hash)
      # views =  @blog.impressionist_count(:filter=>:all)

      render json: { blog: @blog,
                     tags: @blog.tags,
                     blog_creator: @blog.user.username,
                     blog_creator_img: @blog.user.profile_image ,
                     blog_user: @blog.user,
                     bookmark: @blog.bookmarks, 
                     likes: @blog.likes,
                    #  views: views,
                     unique_views: unique_views,
                    }, 
                    status: :ok
  end

  def preview
    # if authorized?
      blog = Blog.find_by(slug: params[:slug])
      render status: :ok, json: { blog: blog }
    # end    
  end

  def create
    # return if suspended(@current_user.can_post_date)
  
    @blog = Blog.new(blog_params.merge(user_id: current_user.id))
    if authorized? 
      if @blog.save
        render status: :ok,
              json: {blog: @blog, tags: @blog.tags , notice: "Blog saved as draft"}
      else
        errors = @blog.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: {error:errors}
      end
    end
  end

  def banner_image
    blog = Blog.find_by(slug: params[:slug])
    upload_image = Cloudinary::Uploader.upload(params[:blog][:image])
    if blog.update_attribute(:image, upload_image['url'])
      render json: {image:blog.image , notice:"Banner Image Added Successfully"}, status: :ok
    else
      render json:{errors:blog.errors.full_messages.to_sentence},
              status: :unprocessable_entity
    end
  end

  def published
    blog = Blog.find_by(slug: params[:slug])
    if blog.update_attribute(:published, params[:blog][:published])
      render json:{blog:blog,notice:"Blog Published"},
                  status: :ok
    else
      render json:{errors:blog.errors.full_messages},
                  status: :unprocessable_entity
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
    @blog = Blog.find_by(slug: params[:slug])
  end

  def blog_params
    params.require(:blog).permit(:title, :body, :published, :is_pinned, :is_locked, :image, :tag_list)
  end

  def suspended(date)
    if date> DateTime.now
      render json:{errors:['Your posting communications are still suspended']}
      return true
    end
    false
  end


  # Only allow the owner of the post or an administrator to destroy/update the post

  def authorized?
    # @blog.user == @current_user ||  @current_user.admin_level >= 1
     @blog.user_id == current_user.id || current_user.admin_level >= 1
  end

  def handle_unauthorized
    unless authorized?
      render json:{notice:"Not authorized to perform this task"}, status:401
    end
  end
  
end
