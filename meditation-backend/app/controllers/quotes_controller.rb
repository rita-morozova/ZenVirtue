class QuotesController < ApplicationController

  def index 
    quotes = Quote.all 
    render json: quotes 
  end

  def show 
    quote = Quote.all.find_by(id: params[:id])
    render json: quote
  end

  def create
    quote = Quote.create(quote: params[:quote], user_id: params[:user_id])
  end

end
