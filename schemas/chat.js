const mongoose = require('mongoose');
const {Shema} = mongoose;

const{Types : {ObjectId}} = Schema;
const chatSchema = new Schema({
    room:{
        //이걸 위해서 Types :{ObjectId} 이걸로 불러옴
        type : ObjectId,
        required :true,
        ref : 'Room'
    },
    user :{
        type : String,
        required : true,
    },
    chat : String,
    gif : String,
    createdAt:{
        type : Date,
        default : Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);