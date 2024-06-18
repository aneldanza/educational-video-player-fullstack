class Api::V1::VideosController < ApplicationController
  def index
    response = get_all_user_videos_response(params[:user_id])

    if response.status == 200
      @videos = JSON.parse(response.body)
      render json: @videos
    else 
      render json: 'COULD NOT GET VIDEOS FOR USER ID'
    end
  end

  def get_all_user_videos_response(user_id)
    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.get do |req|
      req.url '/videos'
      req.headers['Content-Type'] = 'application/json'
      req.params = {"user_id": user_id}
    end

    return response
  end 
end
