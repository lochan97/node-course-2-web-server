const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//heroku
const port= process.env.PORT||3000;


var app = express();

//adding support for partials
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');




app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
next();
});

//setting up maintenance middleware
// app.use((req,res,next)=>
// {
//     res.render('maintenance.hbs');
// });

//Middleware:the html is in the public directory
app.use(express.static(__dirname+'/public'));
//helper to get the year (in footer)
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();});
//helper with argument to capitalise (used in home)
hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();});


//root page (localhost:3000)
app.get('/',(req,res)=>{

// res.send('<h1>Hello Express!</h1>');

//JSON 
// res.send({
//     name:'Lochan',
//     likes:['Biking','Cities']
// });

//using the home template and passing information

res.render('home.hbs',{
    pageTitle:'Home Page',
    bodyText:'This is my body text',
    //as we are using the helper
    // currentYear: new Date().getFullYear()
});
});

// (localhost:3000/about)
app.get('/about',(req,res)=>{
    //passing in data into the template via a second arg
    res.render('about.hbs',{
        pageTitle:'About Page',
        
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: "unable to fulfil this request"
    });
});

//using heroku to set an environment variable
app.listen(port,()=>{
   console.log(`server is up on port ${port}`);
});

app.get('/project',(req,res)=>{
    //passing in data into the template via a second arg
    res.render('project.hbs',{
        pageTitle:'project Page',
        
        // currentYear: new Date().getFullYear()
    });
});