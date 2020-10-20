class UserSerializer < ActiveModel::Serializer
  attributes :id, :meditations, :name, :notes
end
