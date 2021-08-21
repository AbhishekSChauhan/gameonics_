class Blog < ApplicationRecord
  default_scope {order(created_at: :desc)}
  
  # has_rich_text :content

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates_presence_of :title,:body
  
  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
