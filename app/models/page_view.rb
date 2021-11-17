class PageView < Impression

    scope :for_type, -> (type) do
        where(impressionable_type: type)
    end

    scope :for_date_range, -> (start_date, end_date) do
        where(created_at: start_date.beginning_of_day..end_date.end_of_day)
    end

    def self.count_by_date(start_date, end_date)
        results = for_date_range(start_date, end_date)
            .select(:session_hash)
            .group('date(created_at)').count
        
        with_zeros(start_date, end_date, results)
    end

    def self.unique_count_by_date(start_date, end_date)
        results = for_date_range(start_date, end_date)
            .select(:session_hash)
            .distinct
            .group('date(created_at)').count
        with_zeros(start_date, end_date, results)
    end

    def self.with_zeros(start_date, end_date, results_hash)
        date_range = (start_date.to_date..end_date.to_date).to_a.map do |date|
            date
            # .strftime('%a, %-d %b %Y')
        end
        hash_with_zeros = {}
        date_range.each do |date|
            if results_hash[date]
                hash_with_zeros[date] = results_hash[date]
            else
                hash_with_zeros[date] = 0
            end
            # hash_with_zeros[d] = (results_hash[d]) || 0
        end
        hash_with_zeros
    end    
    
end