let express = require('express');
let router = express.Router();
let GatherModel  =  require('../../models/gather');
let PicModel = require('../../models/picture');
let TouristModel = require('../../models/tourist');
const checkLogin = require('../common/check-login');


router.get('/get_pic',function(req,res){
    let data = {location,time,page,num} = req.query;

    PicModel.find(data).then(result => {
        res.json({
            code:200,
            message:'success',
            data:result
        })
    })
    .catch(err => {
        res.json({
            code:200,
            message:JSON.stringify(err)
        })
    })
});


router.get('/get_gather',function(req,res){
    GatherModel.get().then(result => {   
        result.locations.unshift({
            key:'all',
            _id:''
        });
        result.times.unshift({
            key:'all',
            _id:''
        })      
        res.json({
            code:200,
            message:'success',
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            code:100,
            message:JSON.stringify(err)
        })
    })
})

router.post('/save_tourist',checkLogin,function(req,res){
    let data = {
        location,
        description,
        time,
        photos        
    } = req.body;
    data.author = req.session.user._id;
    if(!location || !time || !photos.length){
        return res.json({
            code:100,
            message:'信息不全'
        })
    }
    let savePhotos = req.body.photos;
    savePhotos.forEach((item,index) =>{
        savePhotos[index].location = location;
        savePhotos[index].time = time;
    } )
    PicModel.create(savePhotos)
    .then(result => {
        let photoIds = [];
        result.forEach((item,index) => {
            photoIds.push(item._id);
        })
        data.photos = photoIds;
        TouristModel.create(data)
        .then(result1 => {
            GatherModel.update({
                location:{
                    key:location,
                    _id:result1._id
                },
                time:{
                    key:time,
                    _id:result1._id
                },
                photos:photoIds
            })
            .then(result2 => {
                res.json({
                    code:200,
                    message:'success',
                    data:result1
                })
            })
            .catch(err => {
                res.json({
                    code:100,
                    message:JSON.stringify(err)
                })
            })
            
        })
        .catch(err => {
            
            res.json({
                code:100,
                message:JSON.stringify(err)
            })
        })
    })
    .catch(err => {
        
        res.json({
            code:100,
            message:JSON.stringify(err)
        })
    })

    
});

module.exports = router;