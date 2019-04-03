require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      password: "password",
      email: "test@example.com"
    )
  end

  test "user should be Valid" do
    assert @user.valid?
  end

  test "email must be unique" do
    @user2 = User.create(
      password: "password",
      email: "test@example.com"
    )

    assert_not @user2.valid?
  end

  test "password should be 8 lengths" do
    @user.password = "pass"
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = nil
    assert_not @user.valid?
  end

  test "password should be present" do
    @user.password = nil
    assert_not @user.valid?
  end
end
