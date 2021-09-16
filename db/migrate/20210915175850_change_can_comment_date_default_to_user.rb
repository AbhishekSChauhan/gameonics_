class ChangeCanCommentDateDefaultToUser < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :can_comment_date, DateTime.now
  end
end
