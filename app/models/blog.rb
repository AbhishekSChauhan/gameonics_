class Blog < ApplicationRecord
  default_scope {order(created_at: :desc)}

  scope :published, -> do
    where(published: true)
  end

  scope :most_recently_published, -> do
    where(published_at: :desc)
  end

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  validates :title, length: { in: 4..1000 }, presence: true
  validates :body, length: { in: 100..100000000 }, presence: true
  validates :image, presence: true
  scope :pins, -> { where('is_pinned = true')}
  scope :not_pinned, ->{ where('is_pinned = false')}

  is_impressionable :counter_cache => true, :column_name => :views_count, :unique => :session_hash
  
  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

  def updated_at
    time = attributes['updated_at']
    time.strftime('%a, %-d %b %Y')
  end

end
