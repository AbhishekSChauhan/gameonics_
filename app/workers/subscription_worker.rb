class SubscriptionWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(subscriber,*args)
    SubscriptionMailer.weekly_blogs(subscriber,*args).deliver
  end
end
