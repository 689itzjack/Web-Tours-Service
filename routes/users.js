const fs = require('fs');
const dataPath = 'option1.json';
const mainPage = 'main'




// helper methods



const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";//en el caso que no tengamos data para leer de el archivo users.json retornamos {} para saber que tenemos data pra leer 
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }
        callback();
    });
};


module.exports = {
    //READ
    read_users: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{

                /*let countries=JSON.parse(data);               
                var idtour;
                var tours="";

                for(var item in countries){
                    idtour=countries[item].id;
                    res.write(!data? JSON.parse("{}") :idtour );
                    tours=countries[item].start_date;
                    res.write(!data? JSON.parse("{}") : tours);
                    tours="";
                } 
                res.end();
                for(item in countries){
                    res.write(!data? JSON.parse("{}") : countries.Europe1);
                    res.write(!data? JSON.parse("{}") : countries.Europe2);
                    
                } 
                res.end();*/
                //res.send(!data? JSON.parse("{}") :countries.Europe2);
                res.send(!data? JSON.parse("{}") :JSON.parse(data));                      
            }
               
         });
    },
  
    // CREATE
   create_user: function (req, res) {

        readFile(data => {

            // add the new user
            console.log("WE ARE IN CREAAET USER");
            console.log(req.body.id);
            if (!req.body.id) return res.sendStatus(500);   
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    },

    // UPDATE
    updateTour: function (req, res) {

        readFile(data => {

            console.log(data);
            // add the new user
            const nametour = req.params["id"];
            const date = req.params["start_date"];
            const duration = req.params["duration"];
            const price = req.params["price"];
            const nameguide = req.params["name"];
            const telguide = req.params["cellular"];
            const mailguide=req.params["email"];

            console.log(nametour+date+duration+price+nameguide+telguide+mailguide);
            
            if (data[nametour]){
                if(req.body.duration!==""){
                    data[nametour].duration=req.body.duration;
                }
                if(req.body.start_date!==""){
                    data[nametour].start_date=req.body.start_date;
                }
                if(req.body.price!==""){
                    data[nametour].price=req.body.price;
                }
                if(req.body.guide.name!==""){
                    data[nametour].guide.name=req.body.guide.name;
                }
                if(req.body.guide.email!==""){
                    data[nametour].guide.email=req.body.guide.email;
                }
                if((req.body.guide).cellular!==""){
                    (data[nametour].guide).cellular=(req.body.guide).cellular;
                }     
            }
            
            else {
               
                res.sendStatus(400);
            }
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${nametour} updated`);
            });
        },
            true);
    },

    // UPDATE
    createSiteInPath: function (req, res) {

        readFile(data => {

            console.log(data);
            // add the new user
            const nametour = req.params["id"];
            

            console.log(nametour);
            
            if (data[nametour]){

                var arrPath=req.body.path[0];
                console.log(arrPath);
                data[nametour].path.push(arrPath)                
            }
            
            else {
                res.sendStatus(400);
            }
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${nametour} updated`);
            });
        },
            true);
    },

    // DELETE
    deleteTour: function (req, res) {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            if (!data[userId])  res.sendStatus(400);
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    },

    deleteSite: function (req, res) {

        readFile(data => {

            // add the new user
            const nameTour = req.params["id"];
            const nameSite = req.body.path;
            console.log(nameTour+'  '+nameSite);


            if (!data[nameTour])  res.sendStatus(400);
            else{
                if(nameSite===""){
                    data[nameTour].path=[];
                }
                else{
                    var exist=data[nameTour].path.find(searching=>searching.name===nameSite);
                    console.log(exist);
                    if(exist==undefined) res.sendStatus(400);
                    else{
                        var newArr=data[nameTour].path.filter(deleting=>deleting.name!=nameSite);
                        data[nameTour].path=newArr;
                    }
                }
                
            }
            //delete data[nameTour];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${nameTour} removed`);
            });
        },
            true);
    }
};