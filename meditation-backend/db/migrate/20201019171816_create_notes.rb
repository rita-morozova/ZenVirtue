class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :date
      t.belongs_to :meditation, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
