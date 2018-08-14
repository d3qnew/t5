//const con = require('mysql-pro');

const mysql = require('promise-mysql');

var pass = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Aa000000',
  database: 'koa2web'
}

var conmysql =  function(){}

conmysql.prototype.ls = async function(sqlstr) {
  try{
    let client = await mysql.createConnection(pass)

    let result =await client.query(sqlstr);
    //console.log(result)
    client.end();
    return result;
  }catch (e){
    console.log(e)
  }

}







// lsmysql.prototype.ls = async function(sqlstr) {
//   let client = await new con({
//     mysql: {
//       host: '127.0.0.1',
//       port: 3306,
//       database: 'guazhang',
//       user: 'root',
//       password: 'Aa000000',
//     }
//   })
//
//   try {
//     await client.startTransaction()
//     let rel = await client.executeTransaction(sqlstr, [])
//     await client.stopTransaction()
//
//     //console.log(rel);
//
//     await delete client
//
//     return rel
//   } catch (e) {
//     console.log(e);
//   }
//
// };





module.exports = conmysql;
