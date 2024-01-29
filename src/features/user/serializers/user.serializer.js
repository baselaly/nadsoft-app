export default class UserSerializer {
  static serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      mobile: user.mobile,
    };
  }

  static serializeUsersList(users) {
    return users.map((user) => UserSerializer.serializeUser(user));
  }
}

