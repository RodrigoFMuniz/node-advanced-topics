const cluster = require('cluster')
const http = require('http')
const os = require('os')

const cpus = os.cpus().length
console.log(cpus)

if(cluster.isMaster){
    for(let cpu = 0; cpu<cpus; cpu++){
        cluster.fork()
    }
}
else{
    const server = http.createServer((req, res)=>{
        res.writeHead(200, {'content-type': 'text/text'})
        res.write(`Hi, process =>>> ${process.pid}`)
        res.end()
    })

    server.listen(3000, ()=>console.log(`Server listening on port ${process.pid}`))
}