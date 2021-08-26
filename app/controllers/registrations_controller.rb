class RegistrationsController < ApplicationController
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
    #         username_error = user.errors.full_messages_for(:username)
    #         email_error = user.errors.full_messages_for(:email)
    #         password_error = user.errors.full_messages_for(:password)
    #         passwordConf_error = user.errors.full_messages_for(:password_confirmation)

    #         render json: { username_error:username_error,
    #                         email_error:email_error,
    #                         password_error:password_error,
    #                         passwordConf_error: passwordConf_error,
    #                         error:errors
    #                         },
    #             status: 500
    #     end
    # end

    def create
        user = User.create!(register_params)
        new_activation_key = generate_token(user.id, 62)
        user.update_attribute(:admin_level, 3) if User.all.size <= 1
        if user.update_attribute(:activation_key, new_activation_key)
            ActivationMailer.with(user: user).welcome_email.deliver_now
        end
        render json:{message: 'Account registered but activation required'},
                        status: :created
    end

    def activate_account
        url = 'http://localhost:3000/login'
        user = User.find(params[:id])

        if user.activation_key == params[:activation_key]
            user.update_attribute(:is_activated,true)
        end
         # render json:(message: 'Successfully activated account')
        redirect_to url
    end

    def forgot_password
        user. User.find_by(email: params[:email])
        if user
            new_token = generate_token(user.id, 32, true)
            if user.update_attribute(:password_reset_token,new_token)
                user.update_attribute(:password_reset_date, DateTime.now)
                ActivationMailer.with(user: user).password_reset_email.deliver_now
            else
                render json:({ errors: user.errors.full_messages}, 401)
            end
        end
        render json:{message: 'Password reset information sent to associated account.'} 
    end

    def password_reset_token
        reset_token = params[:password_reset_token]
        url = "http://localhost:3000/reset_password?token=#{reset_token}"
    end

    def change_password_with_token
        token = params[:password_reset_token]
        user = User.find_by(password_reset_token: token) if token.present?
        if user
            #Check token validity
            return render json:{message:'Token expired'},status: 400 if user.password_token_expired?
            
            if user.update(password_params)
                user.update_attribute(:password_reset_token, nil)
                render json: {message:'Password changed successfully'}
            else
                render json:{errors: user.errors.full_messages}, status: 400
            end
        else
            render json: {errors:'Invalid Token'}, status: 401
        endf
    end


    private
    def register_params
        params.require(:user).permit(:username,:email,:password,:password_confirmation)
    end

    def password_params
        params.require(:user).permit(:password,:password_confirmation)
    end
end
