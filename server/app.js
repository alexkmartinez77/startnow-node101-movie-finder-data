const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const cacheArray = [];
var tswitch = false;
var iswitch = false;


app.use(morgan('dev'));

app.get('/', function(req, res){

    if(req.query.t) { 

        if (tswitch === true){
             for(let i=0; i < cacheArray.length; i++){
                if (cacheArray[i].key === req.query.t){
                res.send(cacheArray[i].value);
                }
            } 
                            }
        if (tswitch === false){
                    axios.get('http://www.omdbapi.com/?t=' +  encodeURIComponent(req.query.t)  + '&apikey=8730e0e')
                    .then(function(apiResponse){
                    const key1 = req.query.t;
                    const value1 = apiResponse.data;
                    const object1 ={key: key1, value:value1};
                    res.json(apiResponse.data);
                    cacheArray.push(object1);
                    console.log(cacheArray);
                    tswitch = true;
                                                }
                          )
                    .catch(err => res.json(err.message));

                    }   
                                         
                    } 

     else if (req.query.i) {

        if (iswitch === true){
                 for(let i=0; i < cacheArray.length; i++){
                    if (cacheArray[i].key === req.query.i){
                    res.send(cacheArray[i].value);
                                                          }
                                                        }
                            }
        if (iswitch === false){
            console.log('inside iswitch =  false');
            axios.get('http://www.omdbapi.com/?i=' +  req.query.i  + '&apikey=8730e0e')
            .then(function(apiResponse){
                const key2 = req.query.i;
                const value2 = apiResponse.data;
                const object2 ={key: key2, value: value2};
                cacheArray.push(object2);
                res.json(apiResponse.data);
                console.log(cacheArray);
                iswitch = true;
                })
            .catch(err => res.json(err.message));
                                }
                            }
                            
    else res.json({});
});

module.exports = app;
