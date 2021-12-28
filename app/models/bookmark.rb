class Bookmark < ApplicationRecord
  belongs_to :user, counter_cache: true
  belongs_to :blog, counter_cache: true
  validates :user_id, uniqueness: { scope: [:blog_id] }
end
