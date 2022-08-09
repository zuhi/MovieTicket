const express = require('express');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

let seatMovie = {
    'spiderman': [23,45,24,68,55,67,28],
    'ironMan': [42,45,24,68,56,67,28],
    'doctorStrange': [73,45,29,68,55,67,28]
}

const validUser = "Ankita";
const validPassword = "helloworld";

router.post('/login',(req,res) =>{
    
    if(!req.body){
        res.status(400).send({error: 'Username and password not present'});
    }

    const {name, password} = req.body;

    console.log(name);

    if(validUser === name && validPassword === password){
        console.log("Valid User");
        res.status(200).send('Valid User');
    }
    else{
        res.status(400).send("Invalid user!");
    }
});

router.get('/seat',(req,res)=>{
    res.send(seatMovie);
});

router.post('/seatRemove',(req,res)=>{
    const {movie, array } = req.body;
    seatMovie[movie] = array;
    res.status(200).send('SuccessFully removed');

});

module.exports = router;

