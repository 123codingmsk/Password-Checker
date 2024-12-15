//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;
const corrpassword = "ILoveProgramming";
var userIsAuthorised = false;

app.use(express.urlencoded({extended: true}));

function checkpassword(req, res,next){
    const password = req.body["password"];
    if(password === corrpassword){
        userIsAuthorised = true;
    }
    next();
}
app.use(checkpassword);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post('/check',(req, res)=>{
    if(userIsAuthorised){
        res.sendFile(__dirname+'/public/secret.html');
    }else{
        res.sendFile(__dirname+'/public/index.html');
    }
});

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
});
