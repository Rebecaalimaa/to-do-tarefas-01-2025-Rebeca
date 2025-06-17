require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./src/routes');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000,()=>{
    console.log('API respondendo em http://localhost:', 3000);
});