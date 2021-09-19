class SessionsController < ApplicationController
    # include CurrentUserConcern

    before_action :authorized_user?, except: :create

    # def create
    #     user = User
    #              .find_by(email: params["user"]["email"])
    #              .try(:authenticate, params["user"]["password"])
        
    #     if user
    #         session[:user_id] = user.id
    #         render json:{
    #             status: :created,
    #             logged_in: true,
    #             user: user,
    #             notice: "Login Successful"
    #         }
    #     else
    #         render json: {status: 401, notice:"Invalid Email or password"}
    #     end
    # end

    def create
        user=User.where(username: params[:user][:username].downcase)
                 .or(User.where(email: params[:user][:email].downcase))
                 .first
                
        if user
            authenticate_user(user)
        else
            render json:{errors: 'Incorrect login credentials'}, status: 401 
        end        
    end

    def authenticate_user(user)
        if user.try(:authenticate, params[:user][:password])
            return unless activated(user)
            # session[:user_id] = user.id

            new_token = generate_token(user.id)
            if user.update_attribute(:token, new_token)
                user.update_attribute(:token_date, DateTime.now)
                session[:token] = new_token
                render json:{user: user_status(user),
                            status: :created,
                            notice: "Login Successful",
                            current_user:@current_user
                           }
            else
                render json:{errors: user.errors.full_messages.to_sentence}, status: 401
            end
        else
            render json:{ errors:'Incorrect login credentials'}, status: 401
        end
    end

    def destroy
        # @current_user.update(token: nil)
        reset_session
        render json:{user:{logged_in:false}, notice:'Logout Successful'}, status:200
    end

    def logged_in
        # render json:{
        #         # logged_in: true,
        #         user: user_status(@current_user)
        #     }
        if @current_user
            render json:{
                logged_in: true,
                user: user_status(@current_user)
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        reset_session
        render json: {status:200, logged_out: true,
                notice:"Logout Successful"}
    end

    def user_status(user)
        user_with_status = user.as_json(only: %i[id username
                                        is_activated token admin_level can_post_date
                                        can_comment_date])
        user_with_status['logged_in'] = true
        # user_with_status['can_blog'] = DateTime.now > user.can_post_date
        # user_with_status['can_comment'] = DateTime.now > user.can_comment_date

        user_with_status
    end

    

    def activated(user)
        unless user.is_activated
            render json:{errors: ['Account not activated']}, status:401
            return false
        end
        true
    end

end