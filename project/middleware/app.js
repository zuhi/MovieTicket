const express = require('express');
const app = express();
const port = 3000;
const api = require('./api');
var cors = require('cors');

app.use(cors({credentials: true}));
app.use('/api',api);



app.listen(port, ()=>{
    console.log("Currently listening");
});

