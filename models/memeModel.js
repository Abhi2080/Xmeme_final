const mongooose = require("mongoose")

const memeSchema = new mongooose.Schema({
    name:{
        type:String,
        index:true
    },
    url:{
        type:String,
        index:true
    },
    caption:{
        type:String,
        index : true
    },
    date : Number
})

memeSchema.index({ name : 'text', url : 'text', caption: 'text' });

const Meme = mongooose.model('Meme',memeSchema);

module.exports = Meme