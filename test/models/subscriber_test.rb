require "test_helper"

class SubscriberTest < ActiveSupport::TestCase
  test "invalid if email is nil" do
    subscriber = Subscriber.new(email: nil)
    assert subscriber.invalid?
  end
end
