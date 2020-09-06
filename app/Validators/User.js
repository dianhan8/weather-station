'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|email|unique:users,username',
      nickname: 'required',
      password: 'required',
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email',
      'email.email': 'You valid input a email',
      'email.unique': 'This email is already registered',
      'username.required': 'You must provide a Username',
      'username.unique': 'This username is already registered',
      'password.required': 'You must provide a password',
      'nickname.required': 'You must provide a nickname'
    }
  }
}

module.exports = User
