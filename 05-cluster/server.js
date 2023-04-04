const cluster = require('cluster')

// Is the file being executed in master mode?
if(cluster.isMaster){

    //Cause index.js to be executed again, but in child mode
    cluster.fork()
    cluster.fork()
    cluster.fork()
    cluster.fork()

}else{
    // Im a child, Im going to act like a server and go notihing else
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

    server.get('/fast', (req, res)=>{
        res.status(200).send('Faster many Forks')
    })

    server.listen(3000, ()=> console.log('Listening ... '))
}