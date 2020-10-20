class MeditationsController < ApplicationController

  def index
    meditation = Meditation.all 
    render json: meditation
  end

  def create
    meditation = Meditation.create(name: params[:name], user_id: params[:user_id])
    render json: meditation
  end

  def destroy
    meditation = Meditation.find(params[:id])
    meditation.destroy
    render json: {"Message": "Session was deleted"}
  end

end
