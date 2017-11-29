class AuthenticatedRoot
  def matches?(request)
    user = current_user(request)
    user.present?
  end

  def current_user(request)
    User.find_by_id(request.session[:user_id]) if request.session[:user_id].present?
  end
end