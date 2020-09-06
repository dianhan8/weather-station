'use strict'
const Database = use('Database');

class UserController {
  async login ({ auth, request }) {
    const { email, password } = request.all();
    return auth
    .withRefreshToken()
    .attempt(email, password);
  }

  async getProfile({ response, auth }) {
    const {
      id,
      username,
      email,
      nickname,
      role,
      status,
      created_at,
      updated_at,
    } = auth.current.user;
    return response.send({
      id,
      username,
      email,
      nickname,
      role,
      status: Boolean(status),
      created_at,
      updated_at,
    })
  }

  async updateProfile({ response, request, auth }) {
    const { id } = auth.current.user;
    const { username, email, nickname } = request.all();
    await Database
                .table('users')
                .where('id', id)
                .update({
                  username,
                  email,
                  nickname,
                });

    return response.send({
      data: {
        username,
        email,
        nickname,
      },
      message: 'You successfuly updated your profile',
    });
  }
}

module.exports = UserController
