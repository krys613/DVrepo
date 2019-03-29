var mysql = require('mysql');

//mysql settings
var env = {
    host:'localhost',
    user:'root',
    password:'136483852',
    database:'DvProj'
};


module.exports = mysql.createPool(env);
