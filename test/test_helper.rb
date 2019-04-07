ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token

    {
      "Authorization": "Bearer #{token}"
    }
  end

  def json_response(body)
      ActiveSupport::JSON.decode body
  end
end
