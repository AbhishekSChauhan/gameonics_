class StatsController < ApplicationController
    before_action :get_blog, only: [:index]

    def index
        @count_by_date = @impressions.count_by_date(7.days.ago, Date.today)
        @unique_count_by_date = @impressions.unique_count_by_date(7.days.ago, Date.today)
        render json:{count_by_date_keys: @count_by_date.keys,
                     count_by_date_values: @count_by_date.values,
                     unique_count_by_date_keys:@unique_count_by_date.keys,
                     unique_count_by_date_values:@unique_count_by_date.values,
                     impressions:@impressions}
    end

    private

    def get_blog
        @impressions = PageView.where(impressionable_id: params[:blog_id])
    end
end
