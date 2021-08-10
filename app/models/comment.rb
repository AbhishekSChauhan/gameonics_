class Comment < ApplicationRecord
  belongs_to :blog

  validates_presence_of :content
end
