class Comment < ApplicationRecord
  belongs_to :blog
  belongs_to :user

  validates_presence_of :content

  def self.by_created_at
    order("created_at DESC")
  end

end
