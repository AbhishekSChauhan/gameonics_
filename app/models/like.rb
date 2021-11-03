class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likeable, polymorphic: true, counter_cache: :likeable_count
  validates_presence_of :user, :likeable
  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
end
