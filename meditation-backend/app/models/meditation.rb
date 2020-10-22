class Meditation < ApplicationRecord
  belongs_to :user
  has_many :notes
  before_destroy :destroy_notes
  def destroy_notes
    self.notes.destroy_all
  end
end
