class Comment < ApplicationRecord
  belongs_to :blog, counter_cache: true
  belongs_to :user, counter_cache: true

  belongs_to :comment, optional: true
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likeable
  validates :content, length: { in: 2..500 }, presence: true

  # def comment_json
  #   new_comment = attributes
  #   new_comment['author'] = user.username
  #   new_comment
  # end

  # def self.author_comments_json(comments_array)
  #   returned_comments = []
  #   comments_array.each do |comment|
  #     new_comment = comment.as_json 
  #     new_comment['blog_author'] = comment.blog.author_blogs_json.username
  #     new_comment['blog_title'] = comment.blog.title
  #     new_comment['author'] = comment.author.username
  #     returned_comments.push(new_comment)
  #   end
  #   returned_comments
  # end


  def self.by_created_at
    order("created_at DESC")
  end

  def created_at
    time = attributes['created_at']
    time.strftime('%a, %-d %b %Y')
  end

end
