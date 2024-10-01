const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    }, 
    description: {
        type: String, 
        required: [true, 'Please provide description min 5, max 255'],
        minlength: 3,
        maxlength: 255,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
}, 
{ timestamps: true })


module.exports = mongoose.model('Project', ProjectSchema)