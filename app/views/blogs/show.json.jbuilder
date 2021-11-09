json.blog do
    json.extract! @blog,
        :id,
        :slug,
        :title
    json.user do
        json.id @blog.user.id
        json.name @blog.user.username
    end
end
