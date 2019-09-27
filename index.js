const cripy = require("crypto")
const uid = require("uuid/v4")
const cluster = require("cluster")
const numCPU = require('os').cpus().length
const fs = require("fs")




const start = Date.now()
let master =0
if (cluster.isMaster){
    master= process.pid
    for( var i=0; i<4;i++){
        cluster.fork()
    }
}


else{
    console.log(process.pid)
    let hash= ""
    let validate=true
    let nounce=''
    while (validate){
        nounce= Buffer.from(uid(),'utf-8').toString('hex')
        hash= cripy.createHash('sha256','').update(`${nounce}hi`).digest('hex')
        if(hash.charAt(0)=='0' && hash.charAt(1)=='0'&& hash.charAt(2)=='0' && hash.charAt(3)=='0' && hash.charAt(4)=='0' ){
            // console.log(hash)
            validate=false
        }
        // console.log(hash)
    }
    console.log(hash, nounce)
    console.log(`end: ${Date.now()-start}`)
    process.kill(master)


}


