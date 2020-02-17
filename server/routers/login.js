const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const connection = require('../helpers/connection');
const secret = 'shhhhh';



async function login(request, response){
  const {email, password} = request.body;

  let user = await connection.promise().query(`SELECT * FROM users WHERE email = '${email}'`);

  if (user[0].length > 0) {
    bcrypt.compare(password, user[0][0].password, async (err, data) => {
      if (data) {
        let user_id = user[0][0].id;
        const token = jwt.sign({ id: `${user[0][0].id}` }, secret, {expiresIn: '12h'});
        let sendToke = await connection.promise().query(`INSERT INTO tokens (user_id, user_token) 
        VALUES(${user_id}, '${token}')`);
        response.status(200).json({token: token});
      } else {
        response.status(403).json({'mes': 'not ok'})
      }
    })
  } else {
    response.status(403).json({'mes': 'not ok'})
  }
}




module.exports.login = login;
