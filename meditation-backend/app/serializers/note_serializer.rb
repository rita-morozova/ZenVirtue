class NoteSerializer < ActiveModel::Serializer
  attributes :id, :description, :date
end
