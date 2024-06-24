require "test_helper"

class Api::CommentControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_comment_index_url
    assert_response :success
  end

  test "should get show" do
    get api_comment_show_url
    assert_response :success
  end

  test "should get create" do
    get api_comment_create_url
    assert_response :success
  end
end
