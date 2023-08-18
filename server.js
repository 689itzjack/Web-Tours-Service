const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;

const app=express();

app.use('/list', express.static(path.join(__dirname, 'html/main_page.html')));//this middleware when we put at the URL the path /main so we read the static file html indicated with color red
//when the first parameter __dirname has all the route of our proyect. 
app.use('/css', express.static(path.join(__dirname, 'html/main_style.css')));



app.use('/add_user', express.static(path.join(__dirname, 'html/add_user_form.html')));//this line call to the html/add_user_form.html file when we turn with the path indicated, its a document that help 
app.use('/css', express.static(path.join(__dirname, 'html/add_user_form.html')));

app.use('/update_Tour', express.static(path.join(__dirname, 'html/update_Tour.html')));
app.use('/css', express.static(path.join(__dirname, 'html/update_Tour.html')));

app.use('/add_new_path', express.static(path.join(__dirname, 'html/add_new_path.html')));
app.use('/css', express.static(path.join(__dirname, 'html/add_new_path.html')));

app.use('/delete_Tour', express.static(path.join(__dirname, 'html/delete_Tour.html')));
app.use('/css', express.static(path.join(__dirname, 'html/delete_Tour.html')));

app.use('/delete_Path', express.static(path.join(__dirname, 'html/delete_Path.html')));
app.use('/css', express.static(path.join(__dirname, 'html/delete_Path.html')));


app.use('/js', express.static(path.join(__dirname, 'js')));// this path drives us to read the content of a directory js
/**these 4 middlewares are the routes(nituvim) them help us to serve(servir al cliente) to the client part f.e if somebody turn to the server it must to give us a files html,css ,JS   */


/// esta codigo tiene la misma funcion que la de express.static(), leer el tojen de un kobetz o una tiquia mediante fs.readFile

app.use('/public', express.static(path.join(__dirname, 'public')));//opens the directory public from this project

//restfull 
//app.use(cors());
app.use(express.json());//midddleware
app.use(express.urlencoded({ extended: true }));//middleware

app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
//NOTE :express.static is a middleware from the library express() that permit us return content of a static file or content of a library complete 
//NOTE: las carpetas html, js and public belongs to the clients side and routes belong to the server side