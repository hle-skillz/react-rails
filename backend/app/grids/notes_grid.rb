class NotesGrid
  include Datagrid

  scope do
    Note
  end

  filter(:category, :enum, select: Note::CATEGORIES)
  filter(:user_id, :integer)

  column(:user_id)
  column(:id)
  column(:category)

end
