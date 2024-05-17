const { rejects } = require('assert');
const { error } = require('console');
const { resolve } = require('dns');
const e = require('express');
var fs = require('fs');
const { type } = require('os');
var path = require('path')

/**>
 * Note: Please Read this before read the whole file
 * 
 * 
 * 
 */

function cDir(directoryName, directoryLocation = { driver : 'c:/' }){
    const invalidPath =    !directoryLocation 
                        || directoryLocation.driver === undefined 
                        || !/^[a-zA-Z]:\/?(?:[^\/\s]+\/?)*$/.test(directoryLocation.driver)
    const invalidPathName = directoryName === ''

    if (invalidPath) {
        console.error("Invalid Path")
        return
    }

    if (invalidPathName) {
        console.error("Invalid directory name")
        return
    }

    const { driver } = directoryLocation
    let absolutePath = path.resolve(driver + "/" +directoryName)
    const directoryexist = fs.existsSync(absolutePath)
    if (directoryexist) return absolutePath
    else return fs.mkdirSync(absolutePath, { recursive: true });
    
}
 
function cFile(location,data){
    return fs.appendFile(location, data, error => {
        if (error) return error
    })
}

const rfile = async (location, errorFromServer) => {
    const encoding = {encoding: 'utf-8'}
    fs.readFile(location, encoding, (errorFromServer, data) => {
        if (errorFromServer) {
            console.log("Error "+ errorFromServer)
            throw errorFromServer;
        }
        return data
    }).then((data)=>{
        console.log(data);	
        return data
    }).catch((err)=>{
        console.log(err);
        throw err;	
    })
}


const rfile_v2 = async (location) => {
    const file_content  = await new Promise((resolve,rejects) => {
        return fs.readFile(location,{encoding: 'utf-8'}, (err,data) => {
            if (err) return rejects(err)
            return resolve(data)
        }
    )
    })
    return file_content
}

function wfile(){

}


module.exports = {cFile,cDir,rfile,rfile_v2}