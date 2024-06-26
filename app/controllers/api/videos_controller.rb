class Api::VideosController < ApplicationController

  def index
    response = get_all_user_videos_response(params[:user_id])

    if response.status == 200
      render json: response.body
    else
      render error: "COULD NOT GET VIDEOS FOR USER NAME"
    end
  end

  def update
    @video = {"title": params[:title], "description": params[:description], "video_id": params[:video_id]}

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.put('/videos') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.body = JSON.generate(@video)
    end
    
    if response.status === 200
      render json: JSON.parse(response.body)
    else
      render error: 'COULD NOT UPDATE VIDEO'
    end
  end

  def create
    @video = {"title": params[:title], "description": params[:description], "user_id": params[:user_id], "video_url": params[:video_url]}

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.post('/videos') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.body = JSON.generate(@video)
    end

    
    if response.status === 200
      render json: JSON.parse(response.body)
    else
      render error: 'COULD NOT CREATE NEW VIDEO'
    end
  end

  def show
    @video_id = params[:id]

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.get('/videos/single') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.params = {'video_id': @video_id}
    end

    if response.status === 200
      render json: response.body
    else
      render error: {"error": "COULD NOT GET VIDEO"}
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

  def get_image_paths
    @images = {
        logoColor: path_to_asset('logo_color.png'),
        iconColor: path_to_asset('logo_icon.png')
      }

    render json: @images
  end

  def path_to_asset(asset)
      ApplicationController.helpers.asset_path(asset)
  end
end
