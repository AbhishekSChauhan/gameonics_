class BookmarksController < ApplicationController
    before_action :authorized_user?
    
    def create
        @bookmark = Bookmark.new(bookmark_params.merge(user_id: current_user.id))
        if @bookmark.save
            render json: {bookmark: @bookmark, notice:"Thanks for saving!"}, status: :ok
        else
            render json: {errors:@bookmark.errors.full_messages.to_sentence}
        end 
    end

    def destroy
        @bookmark = current_user.bookmarks.find(params[:id])
        @bookmark.destroy
    end

    private

    def bookmark_params
        params.require(:bookmark).permit(:blog_id)
    end
end