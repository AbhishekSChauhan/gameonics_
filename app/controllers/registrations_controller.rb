class RegistrationsController < ApplicationController
    before_action :authorized_user?, only: %i[change_password destroy]

    # def create
    #     user = User.new(
    #         username: params['user']['username'],
    #         email: params['user']['email'],
    #         password: params['user']['password'],
    #         password_confirmation: params['user']['password_confirmation']
    #     )

    #     if user.save
    #         session[:user_id] = user.id
    #         render json:{
    #             status: :created,
    #             user: user,
    #             notice:"You are succesfully registered"
    #         }
    #     else
    #         errors = user.errors.full_messages.to_sentence

    #         render json: { error:errors},
    #             status: 500
    #     end
    # end

    def create
        user = User.create!(register_params)
        new_activation_key = generate_token(user.id, 52)
        user.update_attribute(:admin_level, 3) if User.all.size <= 1
        if user.update_attribute(:activation_key, new_activation_key)
            ActivationMailer.with(user: user).welcome_email.deliver_now
        end
        session[:user_id] = user.id
        render json:{notice: 'Account registered but activation required'},
                        status: :created
        
    end


    def activate_account
        url = 'https://glacial-falls-06439.herokuapp.com/'
        user = User.find(params[:id])

        if user.activation_key == params[:activation_key]
            user.update_attribute(:is_activated,true)
        end
        render json:{message: 'Successfully activated account'}
        redirect_to url
    end

    def forgot_password
        user = User.find_by(email: params[:email])
        puts user        
        if user            
            new_token = generate_token(user.id, 32, true)
            if user.update_attribute(:password_reset_token,new_token)
                user.update_attribute(:password_reset_date, DateTime.now)
                ActivationMailer.with(user: user).password_reset_email.deliver_now
            # else
            #     render json:{ errors: user.errors.full_messages}, status: 401
            end
            render json:{notice: 'E-mail sent with password reset instructions.'} , status: 200
        else
            render json:{errors: 'Incorrect Email-id'}, status: 401 
        end
        # render json:{notice: 'Password reset information sent to associated account.'} , status: 200
    end

    def password_reset_account
        reset_token = params[:password_reset_token]
        url = "http://localhost:3000/reset_password?token=#{reset_token}"
        redirect_to url
    end

    def change_password
        if @current_user.try(:authenticate, params[:user][:old_password])
            if @current_user.update(password_params)
                render json:{notice:"Password changed successfully"}, status: 200
            else
                render json:{errors: @current_user.errors.full_messages}, status:400
            end
        else
            render json:{errors:"Incorrect password"}, status:401
        end
    end

    def change_password_with_token
        token = params[:password_reset_token]
        user = User.find_by(password_reset_token: token) if token.present?
        if user
            #Check token validity
            return render json:{error:'Token expired'},status: 400 if user.password_token_expired?
            
            if user.update(password_params)
                user.update_attribute(:password_reset_token, nil)
                render json: {notice:'Password changed successfully'}, status: 200
            else
                render json:{errors: user.errors.full_messages}, status: 400
            end
        else
            render json: {errors:'Invalid Token'}, status: 401
        end
    end


    def destroy
        user=User.find(params[:id])
        unless user == @current_user || @current_user.admin_level >= 1
            return head(401)
        end

        user.destroy
        render json:{notice:"Account deleted"}
    end


    private
    def register_params
        params.require(:user)
          .permit(:username, :email, :password, :password_confirmation,:profile_image)
    end

    def password_params
        params.require(:user).permit(:password,:password_confirmation)
    end
end
