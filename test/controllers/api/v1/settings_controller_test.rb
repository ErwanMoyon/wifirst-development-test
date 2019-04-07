require "test_helper"

module Api
  module V1
    class SettingsControllerTest < ActionDispatch::IntegrationTest
      def setup
        @user_1 = users(:user_1)
      end

      test "should create and update a setting" do
        assert_difference "Setting.count", 1 do
          post  "/api/v1/settings/",
                headers: authenticated_header(@user_1),
                params: {
                  setting: {
                    user_id: @user_1.id,
                    city: "London"
                  }
                }
        end

        assert_response :success

        @user_1.reload

        assert_equal @user_1.setting.city, "London"

        assert_no_difference "Setting.count" do
          post "/api/v1/settings/",
                headers: authenticated_header(@user_1),
                params: {
                  setting: {
                    city: "Berlin",
                    id: @user_1.setting.id
                  }
                }
        end

        assert_response :success

        @user_1.reload

        assert_equal @user_1.setting.city, "Berlin"

        # Get settings
        get "/api/v1/settings/" + @user_1.id.to_s,
            headers: authenticated_header(@user_1)

        assert_response :success

        data = json_response(@response.body)

        assert_equal data["id"], @user_1.setting.id
        assert_equal data["city"], @user_1.setting.city
      end

      test "should be connected to change settings" do
        post  "/api/v1/settings/",
              params: {
                setting: {
                  user_id: @user_1.id,
                  city: "London"
                }
              }

        assert_response :unauthorized
      end

      test "should be connected to get settings" do
        get "/api/v1/settings/" + @user_1.id.to_s

        assert_response :unauthorized
      end
    end
  end
end
