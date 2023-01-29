const express = require('express');  // ใช้งาน module express
const { connect } = require('net');
const app = express()  // สร้างตัวแปร app เป็น instance ของ express
const path = require('path') // เรียกใช้งาน path module
const port = 3000  // port 
const mysql = require('mysql');

// ส่วนของการใช้งาน router module ต่างๆ 
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const memberRouter = require('./routes/member.js');
const crudRouter = require('./routes/crud.js');

 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
 
// เรียกใช้งาน indexRouter
app.use('/', indexRouter)
app.use('/', loginRouter)
app.use('/', memberRouter)
app.use('/', crudRouter)



app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})