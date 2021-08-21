class Comment < ApplicationRecord
  belongs_to :blog
  belongs_to :user

  validates_presence_of :content

  def self.by_created_at
    order("created_at DESC")
  end

  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
