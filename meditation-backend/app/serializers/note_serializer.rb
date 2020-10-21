class NoteSerializer < ActiveModel::Serializer
  attributes :id, :description, :date, :meditation_id
end
