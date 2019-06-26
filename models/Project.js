const mongoose   = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String
    },

    imageLink:{
        type: String
    },

    url:{
        type: String
    }
});

module.exports = new mongoose.model('Project', projectSchema);