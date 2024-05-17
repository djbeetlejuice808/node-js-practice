var express = require('express');
var fs = require('fs')
var router = express.Router();
var file = require('../FileHelper/File');

const categories = [
    {
            id: 1,
            title: "Linh kiện điện tử",
            slug: "linh-kien-dien-tu",
            create_at: new Date(),
            update_at: new Date(),
    },
    {
            id: 2,
            title: "Linh kiện điện tử",
            slug: "linh-kien-dien-tu",
            create_at: new Date(),
            update_at: new Date(),
    },
]

const file_base = 'c:\\Online_shop\\Categories.json'


router.get('/get-all',async (req,res, next) => {
    try {
        let rs = await file.rfile_v2(file_base)
        console.log(rs)
        res.send(rs)
    }catch (error){
        res.status(500).json(error)
    }
   
    
   
})
router.get('/get-one/:id', function (req,res, next) {
    const idFromUrl = req.params.id
    let categoryAfterFouned = categories.find(category => category.id == idFromUrl)
    typeof categoryAfterFouned !== 'undefined' 
    ? res.status(200).json(categoryAfterFouned) 
    : res.status(401).send
        ( 
        
            {   
                message: ' Not found any category id contain :' + idFromUrl
            }
        )
    
})
router.post('/create/',(req, res) => {
    
    
})
router.get('/init',(req, res) => {
    let dirPath  = file.cDir("Online_shop")
    let nameOfFile = "Categories"
    let typeOfFile = ".json"
    const final_file = dirPath+"\\"+nameOfFile+typeOfFile
    file.cFile(final_file, JSON.stringify(categories))
    res.status(200).send(final_file)
})

module.exports = router;
