class StatsController < ApplicationController
    before_action :get_blog, only: [:index]

    def index
        @count_by_date = @impressions.count_by_date(30.days.ago, Date.today)
        @unique_count_by_date = @impressions.unique_count_by_date(30.days.ago, Date.today)
        total_views = PageView.select(:session_hash).count
        unique_views = PageView.select(:session_hash).distinct.count
        render json:{count_by_date_keys: @count_by_date.keys,
                     count_by_date_values: @count_by_date.values,
                     unique_count_by_date_keys:@unique_count_by_date.keys,
                     unique_count_by_date_values:@unique_count_by_date.values,
                     total_views:total_views,
                     unique_views: unique_views,
                     impressions:@impressions}
    end

    private

    def get_blog
        @impressions = PageView.where(impressionable_id: params[:blog_id])
    end
end
