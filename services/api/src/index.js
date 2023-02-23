const express = require('express');
const _PORT = 3001;
const app = express();

app.get('/', (req,res)=>{
  res.send('Hello world!');
})

app.listen(_PORT, ()=>{
  console.log('Server started on port ' + _PORT)
});