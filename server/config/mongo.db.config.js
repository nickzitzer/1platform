const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.dbConfig = {
    db: 'mongodb://localhost:27017/oneplatform'
};

let reactComponent = new Schema({
    javascript: {
        type: String
    }
}, {
    collection: 'reactcomponents'
})

module.exports.reactComponent = mongoose.model('ReactComponent', reactComponent)
