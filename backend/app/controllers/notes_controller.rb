class NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]

  # GET /notes
  def index
    sleep(3);
    # datagrid converts sort/filter query parameters to queries
    @grid = NotesGrid.new(params.slice(
      :category, :user_id, # filter params
      :order, :descending # sort params
    ))

    # kaminari adds pagination of results
    @notes = @grid
               .assets # apply grid filter/sort
               .page(params[:page]).per(params[:pageSize]) # pagination

    render json: {
      data: @notes, # current page
      total: @notes.total_count # all pages
    }
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    @note = Note.new(note_params)

    if @note.save
      render json: @note, status: :created, location: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def note_params
      params.permit(:note, :user_id, :category)
    end
end
