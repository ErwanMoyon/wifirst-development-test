class Api::V1::UserTokenController < Knock::AuthTokenController
  protect_from_forgery unless: -> { request.format.json? }  
end
