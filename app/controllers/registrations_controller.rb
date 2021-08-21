class RegistrationsController < ApplicationController
    def create
        user = User.new(
            username: params['user']['username'],
            email: params['user']['email'],
            password: params['user']['password'],
            password_confirmation: params['user']['password_confirmation']
        )

        if user.save
            session[:user_id] = user.id
            render json:{
                status: :created,
                user: user,
                notice:"You are succesfully registered"
            }
        else
            errors = user.errors.full_messages.to_sentence
            username_error = user.errors.full_messages_for(:username)
            email_error = user.errors.full_messages_for(:email)
            password_error = user.errors.full_messages_for(:password)
            passwordConf_error = user.errors.full_messages_for(:password_confirmation)

            render json: { username_error:username_error,
                            email_error:email_error,
                            password_error:password_error,
                            passwordConf_error: passwordConf_error
                            },
                status: 500
        end
    end

end
