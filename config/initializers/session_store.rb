if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_gameonics", domain: "shielded-spire-91772.herokuapp.com"
else
    Rails.application.config.session_store :cookie_store, key: "_gameonics"
end
