# class Ability
#     include CanCan::Ability

#     def initialize(user)
#         user ||= User.new

#         if user.admin_level >= 1
#             can :manage, :all
#         else
#             can :read, :all
#         end
#     end
# end