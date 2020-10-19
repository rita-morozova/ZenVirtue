class NotesController < ApplicationController
    def index
        note = Note.all 
        render json: note
    end

    def create
        note = Note.create(date: params[:date], mediation_id: params[:mediation_id], description: params[:description])
        render json: note
    end

    def destroy
        note = Note.find(params[:id])
        note.destroy
        render json: {"Message": "Note was deleted"}
    end
end
