'use strict'
const Logger = use('Logger');

class RoleDetect {
  async handle ({ auth, request, response }, next, props) {
    const { role } = auth.current.user;
    const isBigOfTwo = props.length > 1;

    if (!isBigOfTwo) {
      if (role == props[0]) {
        await next();
      } else {
        return response.send({
          message: 'You not have access for this API',
        })
      }
    } else {
      const isAccept = props.indexOf(String(role)) >= 0;
      if (isAccept) {
        await next();
      } else {
        return response.send({
          message: 'You not have access for this API',
        })
      }
    }
  }
}

module.exports = RoleDetect