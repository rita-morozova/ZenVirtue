class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :quote, :user_id
end
