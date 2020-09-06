'use strict'
const Database = use('Database');
const Hash = use('Hash');
const CustomException = use('App/Exceptions/CustomException');
const { validate } = use('Validator');

class UserController {
  async index ({ response, request }) {
    const query = request.get();
    const perPage = query.perPage ? query.perPage : 10;
    const page = query.page ? query.page : 1;
    
    const listUsers = await Database.from('users').paginate(page, perPage);

    const { total, lastPage, data } = listUsers;

    return response.send({
      total,
      perPage: listUsers.perPage,
      page: listUsers.page,
      lastPage,
      data: data.map(itemUsers => {
        return {
          username: itemUsers.username,
          email: itemUsers.email,
          nickname: itemUsers.nickname,
          role: itemUsers.role,
          status: itemUsers.status,
          createdAt: itemUsers.created_at,
          updatedAt: itemUsers.updated_at,
        }
      })
    })
  }

  async create ({ response, request }) {
    const { username, nickname, email, password } = request.all();
  
    // const rules = {
    //   email: 'required|email|unique:users,email',
    //   nickname: 'required|email|unique:users,nickname',
    //   password: 'required',
    // }

    // const validation = await validate(request.all(), rules);

    // if (validation.fails()) {
    //   const messages = validation.messages();
    //   throw new CustomException(messages[0].message, 422);
    // }

    const hashPassword = await Hash.make(password);

    const newUser = {
      username,
      nickname,
      email,
      password: hashPassword,
    };


    const findUserExiting = await Database.from('users').where({ email }).orWhere({ nickname });
    const isEmpty = findUserExiting.length === 0;

    if (!isEmpty) {
      const message = 'This account already on database';
      const status = 422;
      throw new CustomException(message, status);
    } else {
      const userId = await Database.table('users').insert(newUser);
      return response.status(201).send({
        data: newUser,
        message: 'You successfuly created a new user',
        userId,
      });
    }
  }

  async update ({ response, request }) {
    const { username, nickname, email, password } = request.all();

    const hashPassword = await Hash.make(password);

    const updatedUser = {
      username,
      nickname,
      email,
      hashPassword,
    };
  }
}

module.exports = UserController
