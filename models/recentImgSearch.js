const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schemaOptions = {
  timestamps: true
}

// define the recent search model
const recentSearchSchema = new Schema({
  searchTerm: String,
  // lesson: when changing shema involving unique field, you have to delete the index fields if you remove the unique field. If problem persist then you might have to drop the whole collection
  // time: { type: String, unique: true }
}, schemaOptions)

// create the modle class
const RecentSearchModel = mongoose.model('recentSearch', recentSearchSchema)

module.exports = RecentSearchModel