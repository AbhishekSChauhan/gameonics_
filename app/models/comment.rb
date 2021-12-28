class Comment < ApplicationRecord
  belongs_to :blog, counter_cache: true
  belongs_to :user, counter_cache: true

  belongs_to :comment, optional: true
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likeable
  validates :content, length: { in: 2..500 }, presence: true

  def self.by_created_at
    order("created_at DESC")
  end

  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
