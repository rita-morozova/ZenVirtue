class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users
    end
    def show
        user = User.find(params[:id])
        render json: user
    end

    def create
        user = User.find_or_create_by(name: params[:name], email: params[:email])
        render json: user
    end
end
