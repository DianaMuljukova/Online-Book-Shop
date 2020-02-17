const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const connection = require('../helpers/connection');
const secret = 'shhhhh';



async function login_new(request, response){
  const {email, password} = request.body;
  let passwordToSave = bcrypt.hashSync(password, salt);

  let user = await connection.promise().query(`INSERT INTO users
  (email, password) VALUES ('${email}', '${passwordToSave}')`);
  let user_id = user[0].insertId;
  const token = jwt.sign({ id: `${user_id}` }, secret, {expiresIn: '12h'});

  let user_token = await connection.promise().query(`INSERT INTO tokens
  (user_id, user_token) VALUES (${user_id}, '${token}')`);
  response.send({token: token})

}




module.exports.login_new = login_new;
