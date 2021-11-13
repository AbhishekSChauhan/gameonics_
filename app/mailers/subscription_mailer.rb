class SubscriptionMailer < ApplicationMailer
    def weekly_blogs(subscriber,*args)
        @subscriber = Subscriber.all
        @blog = Blog.last(3)
        puts @blog
        puts @subscriber
        emails = @subscriber.collect(&:email).join(", ")
        # mail(to: subscriber, subject: 'Popular blogs in this week')
    end
end
