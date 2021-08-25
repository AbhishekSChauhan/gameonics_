class Blog < ApplicationRecord
  default_scope {order(created_at: :desc)}

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, length: { in: 3..48 }, presence: true
  validates :body, length: { in: 5..100000000 }, presence: true
  
  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
