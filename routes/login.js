const express = require('express')
const router = express.Router()
 
// เมื่้อเข้ามาที่หน้าแรก path: "/". 
router.get('/login', function(req, res) {
    res.render('login', { fname: 'worachet',lname: 'raphukhiew' })
})
 
module.exports = router