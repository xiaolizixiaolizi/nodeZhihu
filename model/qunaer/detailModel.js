const { Schema, model } = require('mongoose')
const detailSchema = new Schema({
  sightName: { type: String },
  bannerImg: { type: String },
  gallaryImgs: { type: Array },

  categoryList: [
    {
      title:String,
      children:[
        {
          title:String,
           children:[
             {
               title:String
             }
           ]
        }
      ]

    }
    
  ]
})
module.exports = model('quDetail', detailSchema)
