class UsersController < ApplicationController
    before_action :authorized_user?, only: [:update_image,:update_profile]
    before_action :authorized_admin?, only: [:suspend_communication, :set_admin_level]
    before_action :set_user, only: [:show, :update_image, :set_admin_level, :suspend_communication]

    def index
        all_users = User.all.order(created_at: :desc)
        users_array = []
        all_users.each do |user|
            new_user = user.as_json(only: %i[id username is_activated admin_level bio])
            new_user['can_blog'] = DateTime.now > user.can_post_date
            new_user['can_comment'] = DateTime.now > user.can_comment_date
            new_user['profile_image'] = nil
            unless user.profile_image_attachment.nil?
                new_user['profile_image'] = url_for(user.profile_image)
            end
            users_array.push(new_user)
        end
        render json: {users:users_array}
    end


    def show
        selected_user = User.find_by(username: params[:username])
        published_blogs = Blog.where(user_id: selected_user.id , published:true ).order(created_at: :desc)
        draft_blogs = Blog.where(user_id: selected_user.id , published:false ).order(created_at: :desc)
   
        bookmarks = selected_user.bookmarks
        bookmarked = bookmarks.map{|bookmark| bookmark.attributes.except('updated_at','created_at')
                            .merge({blogs: bookmark.blog},
                            # {views: bookmark.blog.impressionist_count},
                            {blog_creator: bookmark.blog.user.username},
                            {avatar: bookmark.blog.user.avatar},
                            {likes: bookmark.blog.likes},
                            {comments: bookmark.blog.comments}                             
                            )}
        # data = bookmarks.as_json(include: :blog)

        
        render json:{user: user_with_image(selected_user),
                    received_follows:selected_user.received_follows,
                    given_follows:selected_user.given_follows,
                    published_blogs: published_blogs,
                    draft_blogs: draft_blogs,
                    user_blogs: selected_user.blogs,
                    likes: selected_user.likes,
                    bookmarked: bookmarked ,
                    # followinG:followinG_array,
                    # followerS:followerS_array,
                    # following_count: selected_user.followings.count,
                    # followers_count: selected_user.followers.count                  
                }    
    end

    def update_image
        if current_user.update_attribute(:profile_image, params[:user][:profile_image])
            current_user.update_attribute(:avatar, url_for(current_user.profile_image))
            render json:{user: user_with_image(current_user),
                        avatar:url_for(current_user.profile_image),
                        notice:"Image added successfully"},
                        status: 200
        else
            render json: {errors:current_user.errors.full_messages}, status: 422
        end
    end
    

    def update_profile
        if current_user
            current_user.update_attribute(:username, params[:username])
            current_user.update_attribute(:bio, params[:bio])
            current_user.update_attribute(:facebook_url,params[:facebook_url])
            current_user.update_attribute(:twitter_url,params[:twitter_url])
            current_user.update_attribute(:instagram_url,params[:instagram_url])
            render json: {user: user_with_image(current_user),notice:"Profile details updated successfully"}, status: :ok
        else
            render json: {errors: current_user.errors.full_messages}, status: 422
        end 
    end

    def follow
        selected_user = User.find_by(username: params[:username])
        fo = current_user.given_follows.create(followed_id: selected_user.id)
        render json: {notice: 'Followed user',fo:fo}
    end

    def unfollow
        selected_user = User.find_by(username: params[:username])
        ufo = current_user.given_follows.find_by(followed_id: selected_user.id)
        d_ufo = ufo.destroy
        render json: {notice: 'Unfollowed user',ufo:ufo,d_ufo:d_ufo,
         fol:selected_user.received_follows, given_fol:current_user.given_follows
        }
    end

    def following
        selected_user = User.find_by(username: params[:username])
        followinG = selected_user.followings
        followinG_array = []
        followinG.each do |user|
            new_user = user.as_json(only: %i[id username is_activated admin_level])
            new_user['can_blog'] = DateTime.now > user.can_post_date
            new_user['can_comment'] = DateTime.now > user.can_comment_date
            new_user['profile_image'] = nil
            unless user.profile_image_attachment.nil?
                new_user['profile_image'] = url_for(user.profile_image)
            end
            followinG_array.push(new_user)
        end
        render json: {user_followings:followinG_array,
                    selected_user: user_with_image(selected_user),
                    received_follows:selected_user.received_follows,
                    given_follows:selected_user.given_follows,
                    }
    end

    def followers
        selected_user = User.find_by(username: params[:username])
        followerS = selected_user.followers
        followerS_array = []
        followerS.each do |user|
            new_user = user.as_json(only: %i[id username is_activated admin_level])
            new_user['can_blog'] = DateTime.now > user.can_post_date
            new_user['can_comment'] = DateTime.now > user.can_comment_date
            new_user['profile_image'] = nil
            unless user.profile_image_attachment.nil?
                new_user['profile_image'] = url_for(user.profile_image)
            end
            followerS_array.push(new_user)
        end
        render json: {user_followers:followerS_array,
                    selected_user: user_with_image(selected_user),
                    received_follows:selected_user.received_follows,
                    given_follows:selected_user.given_follows,
                    }
    end


    def set_admin_level
        error_disc = 'Your admin level is too low'
        error_disc2 = "Can't change the administrative level of the site owner"

        render json:{errors:error_disc}, status:422 if @current_user.admin_level < 2
        render json:{errors:error_disc2}, status:422 if @user.admin_level == 3

        @user.update_attribute(:admin_level, params[:user][:admin_level])
        render json:{user:user_with_image(@user)}
    end

    def suspend_communication
        error_desc = 'You do not have the necessary privileges'
        error_desc2 = 'Ban dates cannot be blank'
        error_desc3 = 'Ban dates must be in array format'

        render json:{errors:error_desc}, status: 422 if @current_user.admin_level < 1
                
        blog_ban = params[:user][:can_post_date]
        comment_ban = params[:user][:can_comment_date]
    
        render json:{ errors: error_desc2 }, status: 422 if blog_ban.nil? || comment_ban.nil?
        render json:{ errors: error_desc3 }, status: 422 unless blog_ban.is_a?(Array) && comment_ban.is_a?(Array)
    
        suspend_comms(@user, blog_ban, :can_post_date)
        suspend_comms(@user, comment_ban, :can_comment_date)

        render json:{user:user_with_image(@user)}
    end


    private

    def set_user
        @user = User.find_by(username: params[:username])
    end

    def user_params
        params.require(:user).permit(:bio, :facebook_url, :twitter_url, :instagram_url)
    end

    def suspend_comms(user, comms, attr)
        comms_i = comms.map(&:to_i)
        d = DateTime.now
        ban_date = DateTime.new(comms_i[0], comms_i[1], comms_i[2], comms_i[3], comms_i[4], 0, d.offset);
        user.update_attribute(attr, ban_date)
    end

    # Returns a hash object of a user with their profile_image included
    def user_with_image(user)
        user_with_attachment = user.as_json(only: %i[id username is_activated bio avatar
                                                    admin_level can_post_date email
                                                    can_comment_date facebook_url 
                                                    twitter_url instagram_url])
        user_with_attachment['profile_image'] = nil
        # user_with_attachment['can_post'] = DateTime.now > user.can_post_date
        # user_with_attachment['can_comment'] = DateTime.now > user.can_comment_date
        user_with_attachment['server_date'] = DateTime.now

        unless user.profile_image_attachment.nil?
            user_with_attachment['profile_image'] = url_for(user.profile_image)
        end

        user_with_attachment
    end
end
