const express = require('express')
const router = express.Router()
const mysql = require('mysql');

// เมื่้อเข้ามาที่หน้าแรก path: "/". 
router.get('/member', function(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "serverapi"
    });
    con.connect(function (err){
        if (err) throw err;
       // console.log("Connect!");
        var sql = "select * from member";
        con.query(sql,function (err,result){
            if (err) throw err;
            res.render('member',{resultsPerson : result});
        });
        //con.end()
    })
    
})
 
module.exports = router