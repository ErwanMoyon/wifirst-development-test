class Api::V1::SettingsController < SecuredController
  def create
    setting = current_user.setting.nil? ? Setting.create(user_id: current_user.id) : current_user.setting

    if setting.update_attributes(setting_params)
      render json: setting.to_json, status: :ok
    else
      render json: { status: 422 }, status: :unprocessable_entity
    end
  end

  def show
    render json: current_user.setting.to_json
  end

  private

  def setting_params
    params.require(:setting).permit(:id, :user_id, :city)
  end
end
