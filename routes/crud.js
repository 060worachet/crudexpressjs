const express = require('express');
const router = express.Router()
const mysql = require('mysql');
const app = express();
app.use(express.json());


//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'serverapi'
})

connection.connect((err) =>{
    if (err){
        console.log('Error connect sql database = ',err)
        return;
    }
    //console.log('mysql connect');
})


// POST

router.post("/crud/post",async (req,res) => {
    const{name,surname,price}=req.body;

    try{
        connection.query(
            "INSERT INTO member (name, surname, price) VALUES(?, ?, ?)",
            [name, surname, price],
            (err, result, fields) => {
                if (err){
                    console.log("Erro while insert user to database", err);
                    return res.status(400).send();
                }
                //return res.status(201).json({message: "new user create successfully"});
                //return res.render('http://localhost:3000/');
                return res.redirect('http://localhost:3000/member');


            }
        )
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
}) 


//get
router.get("/crud/get",async(req, res)=> {
    try{
        connection.query("SELECT * FROM member",(err,result,fields) =>{
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result)
           // console.log(result)
        })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})

//patch
router.patch("/crud/update/:id",async (req,res) => {
    const id = req.body.id;
    const newprice = req.body.newprice;
    try{
        connection.query("UPDATE member SET price = ? WHERE id = ?",[newprice,id],(err,result,fields) =>{
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "user price update successfully"})
           // console.log(result)
        })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})

//delete
router.delete("/crud/delete/:id",async(req,res) => {
    const id = req.params.id;
    try{
        connection.query("DELETE FROM member WHERE id = ?",[id],(err,result,fields) =>{
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            if (result.affectedRows === 0){
                res.status(404).json({ message: "no user with id"});
            }
            res.status(200).json({ message: "user delete successfully"});
        })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})
module.exports = router