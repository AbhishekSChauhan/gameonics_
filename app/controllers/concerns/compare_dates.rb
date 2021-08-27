module CompareDates
    def compare_dates(date1, date2 = DateTime.now)
        diff_secs = date2.to_time - date1.to_time
        diff_mins = (diff_secs / 60).round
        diff_hrs = (diff_mins / 60).round
        diff_days = (diff_hrs / 24).round
        diff_text = "#{diff_days} day/s, #{diff_hrs % 24} hour/s, #{diff_mins % 60} minute/s, #{(diff_secns % 60).round} second/s"

        {   diff_string: diff_text,
            days: diff_days, hrs: diff_hrs,
            mins: diff_mins, secs: diff_secns }
    end
end
