'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


/**
 * PUBLIC API V1
 */

Route.group(() => {

  /**
   * AUTH
   */
  Route
  .post('/login', 'UserController.login')
  .middleware('guest');

}).prefix('api/v1');


/**
 * AUTH MIDDLEWARE API V1
 */

Route.group(() => {

  /**
   * PROFILE
   */

  Route.get('/profile', 'UserController.getProfile');
  Route.patch('/profile/update', 'UserController.updateProfile');
  
  /**
   * USERS 
   */

  Route
      .get('/users', 'Admin/UserController.index')
      .middleware(['role:1']);
  Route
      .post('/users', 'Admin/UserController.create')
      .validator('User')
      .middleware(['role:1'])
}).prefix('api/v1').middleware('auth');