class Blog < ApplicationRecord
  default_scope {order(created_at: :desc)}
  scope :active, -> { where(published: true) }

  def self.active?
    published
  end


  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, length: { in: 4..48 }, presence: true
  validates :body, length: { in: 5..100000000 }, presence: true
  validates :image, presence: true
  scope :pins, -> { where('is_pinned = true')}
  scope :not_pinned, ->{ where('is_pinned = false')}

  def blog_json
    new_blog = attributes
    new_blog['author'] = user.username
  end

  # def self.author_blogs_json(blogs_array)
  #   returned_blogs = []
  #   blogs_array.each do |blog|
  #     new_blog['title'] = blog.title.slice(0..30)
  #     new_blog['body'] = blog.body.slice(0..32)
  #     new_blog['author'] = blog.user.username
  #   end
  # end

  # def self.author_comments_json(comments_array)
  #   returned_comments=[]
  #   comments_array.each do |comment|
  #     new_comment = comment.as_json
  #     new_comment['author'] = comment.user.username
  #     new_comment['server_date'] = DateTime.now
  #     returned_comments.push(new_comment)
  #   end
  #   returned_comments
  # end

  # def self.pins_json
  #   results = []
  #   all_pins = Blog.pins
  #   all_pins.each do |p|
  #     new_blog = p.blog_json
  #   end
  #   results
  # end
  
  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
