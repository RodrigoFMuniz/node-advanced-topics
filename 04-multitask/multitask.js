// const https = require('https')
const http = require('http')
const crypto = require('crypto');
const fs = require('fs')

const start = Date.now()

function doRequest(){
    http
        .request('http://www.google.com/', res => {
            res.on('data', (obj) =>{})
            res.on('end', () => {
                console.log('HTTP: ',Date.now() - start, 'ms')
            })
        })
        .end()
}

function doHash(){
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {

        console.log('Hash: ', Date.now() - start, 'ms');
    })
}

doRequest()

fs.readFile('multitask.js', 'utf-8', () => {
    console.log('FS:', Date.now() - start, 'ms')
})

doHash()
doHash()
doHash()
doHash()