const { Schema, model } =require('mongoose')
const citySchema = new Schema({
  "__v": { type: Number, select: false },
  "hotCities": [{
    id: { type: Number },
    spell: { type: String },
    name: { type: String }
  }],
  cities: {
    A:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    B:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    C:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    D:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    E:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    F:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    G:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    H:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    J:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    K:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    L:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    M:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    N:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    P:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    Q:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    R:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    S:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    T:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    W:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    X:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    Y:[{id: { type: Number },spell: { type: String },name: { type: String }}],
    Z:[{id: { type: Number },spell: { type: String },name: { type: String }}] 
  }

})

module.exports = model('quCity', citySchema)