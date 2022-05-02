class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.text :note
      t.references :user, foreign_key: true
      t.text :category

      t.timestamps
    end
  end
end
