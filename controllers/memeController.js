const mongoose = require("mongoose");
const Meme = require("../models/memeModel")

// function to add a meme to the database
exports.addMeme = async function(req, res, next){
    const name = req.body.name;
    const url = req.body.url;
    const caption = req.body.caption;

    if( !name || !url || !caption ){
        res.status(406).json({
            status : "fail",
            message : "Require all the fields"
        })
        return
    }

    // search if the same meme existed previously
    const checkMeme = await Meme.aggregate([
        { $match : { name : name, url : url, caption : caption} }
    ])
    // console.log(checkMeme)
    if( checkMeme.length !=0 ){
        res.status(409);
        res.end();
        return;
    }

    const newMeme = await Meme.create({ 
        name : name,
        url : url,
        caption : caption,
        date : Date.now()
    })

    res.status(200).json({
        id : newMeme._id.toString()
    })
}

// function to get the latest 100 memes
exports.getMeme = async function(req, res, next ){
    var memeList = await Meme.aggregate([
        {$sort: {date: -1}},
       { $project: { _id:0, id:"$_id", name : 1, url : 1, caption : 1} },
        { $limit : 100}
    ])

    res.status(200).send(memeList)
}

// function to get a particular meme
exports.getParticularMeme = async function( req, res, next ){
    var query_id = req.params.id.toString()

    try{
        var req_meme = await Meme.aggregate([
            { $match : { _id : mongoose.Types.ObjectId(query_id) } },
            { $project: { _id:0, id:"$_id", name : 1, url : 1, caption : 1} }
        ])

        res.status(200).send(req_meme[0])
    }catch(err){
        console.log(err)
        res.status(400).json({
            status : "success",
            message : "Invalid id"
        })
    }
}

// function to update a particular meme 
exports.updateParticularMeme = async function( req, res, next ){
    var query_id = req.params.id.toString()
    var newCaption = req.body.caption
    var newUrl = req.body.url

    if( !newCaption ){
        // update only the newUrl
        try{
            var upBlog = await Meme.findByIdAndUpdate( {_id : query_id}, { url : newUrl});
            res.status(200);
            res.end();
            return;
        }catch(err){
            res.status(404);
            res.end();
            return;
        }
    }else if( !newUrl ){
        // update only the newCaption
        try{
            var upBlog = await Meme.findByIdAndUpdate( {_id : query_id}, { caption: newCaption });
            res.status(200);
            res.end();
            return;
        }catch(err){
            res.status(404);
            res.end();
            return;
        }
    }else if( !newCaption && !newUrl) {
        res.status(406);
        res.end();
        return;
    }
    else{
        //update both the things
        try{
            var upBlog = await Meme.findByIdAndUpdate( {_id : query_id}, { url : newUrl, caption: newCaption});
            res.status(200);
            res.end();
            return;
        }catch(err){
            res.status(404);
            res.end();
            return;
        }
    }




}

// function to search for memes in the whole database
exports.searchMeme = async function( req, res, next ){
    try{
        var string = req.params.string;
        memes = await Meme.aggregate([
            {$match : { $text : { $search : string } }},
            {$sort: {date: -1}},
           { $project: { _id:0, id:"$_id", name : 1, url : 1, caption : 1} },
            { $limit : 100}
        ])

        res.status(200).send(memes);
    }catch(err){
        res.status(404);
        res.end();
    }
}

// function to delete a meme from the database
exports.deleteMeme = async function( req, res, next ){
    const id = req.params.id;
    
    try{
        const newMeme = await Meme.findByIdAndDelete(id);
        res.status(200);
        res.end();
        return;
    }catch(err){
        res.status(404);
        res.end();
        return;
    }
}