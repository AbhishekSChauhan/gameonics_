if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_gameonics", domain: "morning-anchorage-15866.herokuapp.com"
else
    Rails.application.config.session_store :cookie_store, key: "_gameonics"
end
