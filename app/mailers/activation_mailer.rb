class ActivationMailer < ApplicationMailer
    def welcome_email
        @user = params[:user]
        mail(to: @user.email, subject:'You are welcomed to share your stories on Gameonics')
    end
    def password_reset_email
        @user = params[:user]
        mail(to: @user.email, subject: 'Forgot your password?')
    end
end
