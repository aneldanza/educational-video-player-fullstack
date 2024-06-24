class Api::CommentsController < ApplicationController
  def index
    puts 'RECEIVED GET ALL COMMENTS REQUEST'
    response = get_all_comments_response(params[:video_id])

    if response.status == 200
      render json: response.body
    else
      render json: "COULD NOT GET COMMENTS FOR VIDEO"
    end
  end

  def show
  end

  def create
    puts 'RECEIVED CREATE REQUEST'
   
    @comment = {"user_id": params[:user_id], "video_id": params[:video_id], "content": params[:content]}

    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.post('/videos/comments') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.body = JSON.generate(@comment)
    end

    
    if response.status === 200
      render json: JSON.parse(response.body)
    else
      render json: 'COULD NOT CREATE NEW comment'
    end
  end

  def get_all_comments_response(video_id)
    connection = Faraday.new(url: 'https://take-home-assessment-423502.uc.r.appspot.com/api')

    response = connection.get('/videos/comments') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.params = {"video_id": video_id}
    end

    return response
  end 

end
