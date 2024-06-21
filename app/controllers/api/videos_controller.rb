class Api::VideosController < ApplicationController

  def index
    puts 'RECEIVED GET ALL VIDEOS REQUEST'
    response = get_all_user_videos_response(params[:user_id])

    if response.status == 200
      render json: response.body
    else
      render json: "COULD NOT GET VIDEOS FOR USER NAME"
    end
  end

  def create
    puts 'RECEIVED CREATE REQUEST'
   
    @video = {"title": params[:title], "description": params[:description], "user_id": params[:user_id], "video_url": params[:video_url]}

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.post('/videos') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.body = JSON.generate(@video)
    end

    
    if response.status === 200
      render json: JSON.parse(response.body)
    else
      render json: 'COULD NOT CREATE NEW VIDEO'
    end
  end

  def show
    puts 'RECEIVED GET VIDEO REQUEST'
    @video_id = params[:id]

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.get('/videos/single') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.params = {'video_id': @video_id}
    end

    if response.status === 200
      render json: response.body
    else
      render json: {"error": "COULD NOT GET VIDEO"}
    end
  end

  def get_all_user_videos_response(user_id)
    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.get('/videos') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.params = {"user_id": user_id}
    end

    return response
  end 
end
