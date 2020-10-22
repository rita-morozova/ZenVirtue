class MeditationSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :date, :user_id
end
