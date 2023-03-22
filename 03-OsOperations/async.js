const https = require('https')
const http = require('http')
const { Stream } = require('stream')

const start = Date.now()

function doRequest(){
    http
        .request('http://www.google.com/', res => {
            res.on('data', (obj) =>{})
            res.on('end', () => {
                console.log(Date.now() - start)
            })
        })
        .end()
}

doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()