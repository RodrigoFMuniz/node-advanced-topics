const express = require('express')
const server =  express()

function doWork(duration){
    const start = Date.now()
    while(Date.now() - start < duration){}
}

server.get('/', (req, res)=>{
    doWork(5000)
    res.status(200).send('Hi There')
})

server.listen(3000, ()=> console.log('Listening ... '))