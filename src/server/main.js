const express = require("express");
const cors = require('cors')

const mongoose = require('mongoose');
const { sortAndDeduplicateDiagnostics } = require("typescript");
// const { isStringLiteral } = require("typescript");
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
// parse application/json
// app.use(bodyParser.json())
app.use(cors());
const port = 3000;
const User = mongoose.model('users', 
{email: String, nickname: String,password: String,
    todo:[{list:String,status:false}] 
});
let data = {email: String, nickname: String};
let changeUser = {email:String,nickname: String,password: String, oldUserEmail: String };
let changeBack = {email:String,nickname: String,password: String };
let removeUser = {email:String,password: String};
let newList = {list:String, status:false};
let createdList = {_id:String,list:String, status:false};
(async () => {
    app.get('/users',async (req,res) => {
        const user = await User.find({});
        res.status(200).send(user);
    })
    app.get('/users/:id',async (req,res) => {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    })
    app.put('/users',async (req,res) => {
        changeUser = req.body;
        if(!CheckAll(changeUser.email,changeUser.password,changeUser.nickname)) {
            return res.status(422).send({msg: "Invalid data exception"});
        } 
        const user = await User.findOneAndUpdate(
            {email: changeUser.oldUserEmail},
            {
                email: changeUser.email,
                nickname: changeUser.nickname,
                password: changeUser.password,
            });
        if(user) {
            changeBack.email = user.email;
            changeBack.nickname = user.nickname;
            changeBack.password = user.password;
            console.log();
            await user.save();
            return res.status(201).send({changeBack})
        }
        else {
            return res.status(404).send({msg: "Not found"});
        }
    })
    // app.patch(){}
    app.post('/users',async (req,res) => {
        const user = new User;
        user.email = req.body.email;
        user.nickname = req.body.nickname;
        user.password = req.body.password;
        console.log(user);
        if(checkEmail(user.email)) {
            if(await checkEmailUnique(user.email)) {
                if(checkPassword(user.password)) {
                    if(checkNickname(user.nickname)) {
                        await user.save();
                        data.email = user.email;
                        data.nickname = user.nickname;
                        return res.status(201).send({data});
                    }
                    else
                        return res.status(422).send({msg: "nickname should be longer or equal 2!"});
                }
                else 
                    return res.status(422).send({msg: "password should be longer or equal 6!"});
            }
            else {
                return res.status(411).send({msg: "such email already exists!"});
            }
        }
        else 
            return res.status(422).send({msg: "invalid  email!"});
    })
    app.post('/users/:email',async (req,res) => {
        const user = await User.findOne({email: req.params.email});
        if(user) {
            return (user.password === req.body.password) 
            ? res.status(201).send({msg: "Success"}) 
            : res.status(422).send({msg: "Invalid data"})
        }
        else {
            return res.status(422).send({msg: "Invalid data"});
        }
    })
    app.post('/user',async (req,res) => {
        removeUser = req.body;
        const user = await User.findOne({email: removeUser.email, password: removeUser.password});
        if(user) {
          await user.delete();
            res.status(201).send({msg: "Success delete"});
        }
        else {
            res.status(404).send({msg : "not found"});
        }
    })
    app.post('/todoList/:id',async (req,res) => {
        const user = await User.findById(req.params.id);
        if(user) {
            newList.list = req.body.todo;
            let index = await user.todo.push(newList);
            createdList = user.todo[index-1];
            await user.save();
            console.log(createdList);
            _id = createdList._id;
            return res.status(201).send({_id});
        }
        return res.status(404).send({msg : "not found"});
    })
    app.delete('/users/:id',async (req,res) => {
        const user = await User.findById(req.params.id);
        user.delete();
        res.status(201).send({msg: "Success delete"});
    })
    app.post('/todoListRemove/:id',async (req,res) => {//delete!
        console.log(req.params.id + " req params id");
        console.log(req.body.id + " req body id");
        await User.findOneAndUpdate({_id: req.params.id, "todo._id": req.body.id},
        { $pull: 
            { 'todo': 
                { _id:req.body.id} 
            } 
        });
        return res.status(201).send({msg: "Success"});
    })

    app.put('/todoList/:id',async (req,res) => {//add
        console.log(req.body);
        await User.findOneAndUpdate(
            {_id: req.params.id, "todo._id": req.body.id},
            {$set: 
                {"todo.$": 
                    {list: req.body.list, status: req.body.status}
                }
            });
            return res.status(201).send({msg: "Success"});

    })
    function checkEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        return (email == "" || email == null) ? 
        false : (regex.test(email)) ? 
        true : false;
    }
    function checkPassword(password) {
        return (password!=null && password.length > 5) ? true : false;
    }
    function checkNickname(nickname) {
        return (nickname!=null && nickname.length >= 2) ? true : false;
    }
    async function checkEmailUnique(checkEmail) {
        const user = await User.findOne({email: checkEmail});
        return (user) ? false : true;
    }
    async function CheckAll(email,password,nickname) {
        let result = checkEmail(email);
        if(!result) return false;
        result = await checkEmailUnique(email);
        if(!result) return false;
        result = checkPassword(password);
        if(!result) return false;
        result = checkNickname(nickname);
        if(!result) return false;
        return true;
    }
})();

app.listen(port,() => {
    console.log(`Server has been started: http://localhost:${port}\n`);
});
