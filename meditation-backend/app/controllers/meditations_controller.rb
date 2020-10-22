class MeditationsController < ApplicationController

  def index
    meditations = Meditation.all 
    render json: meditations
  end

  def show
    meditation = Meditation.find_by(id: params[:id])
    render json: meditation
  end

  def edit
    meditation =Meditation.find_by(id: params[:id])
  end

  def update
    meditation = Meditation.find_by(id: params[:id])
    meditation.update(date: params[:date], name: params[:name])
    render json: meditation
  end 

  def create
    meditation = Meditation.create(date: params[:date], name: params[:name], user_id: params[:user_id])
    render json: meditation
  end

  def destroy
   
    meditation = Meditation.find_by(id: params[:id])
    meditation.destroy
    render json: {"Message": "Meditation was deleted"}
  end

end
