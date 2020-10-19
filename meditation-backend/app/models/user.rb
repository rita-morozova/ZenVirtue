class User < ApplicationRecord
    has_many :meditations
    has_many :notes, through: :meditations
end
