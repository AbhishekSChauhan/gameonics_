class BookmarksController < ApplicationController
    before_action :authorized_user?

    def show
        render json: {bookmarked_blog: @bookmark.blog}
    end
    
    def create
        @bookmark = Bookmark.new(bookmark_params.merge(user_id: current_user.id))
        if @bookmark.save
            render json: {bookmark: @bookmark, notice:"Blog bookmarked"}, status: :ok
        else
            render json: {errors:@bookmark.errors.full_messages.to_sentence}
        end 
    end

    def destroy
        @bookmark = current_user.bookmarks.find(params[:id])
        @bookmark.destroy
        render json: {notice:"Bookmark removed"}
    end

    private

    def bookmark_params
        params.require(:bookmark).permit(:blog_id)
    end
end