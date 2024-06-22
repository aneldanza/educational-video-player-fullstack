class Api::CommentController < ApplicationController
  def index
    puts 'RECEIVED GET ALL VIDEOS REQUEST'
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
