'use strict';

var mysql = require('mysql');

//mysql settings
var env = {
    host: 'localhost',
    user: 'root',
    password: 'qaz123',
    database: 'visualization'
};

module.exports = mysql.createPool(env);