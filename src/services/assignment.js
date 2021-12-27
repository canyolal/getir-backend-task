const records = require('../models/records')

// eslint-disable-next-line no-unused-vars
const getAllDocs = async (body) => {

  //ISODate conversion to compare mongo's format
  // const sDate = new Date(body.startDate)
  // const eDate = new Date(body.endDate)

  //Filter date while matching and use projection to fetch only useful fields
  return await records.find({ },{
    counts: true,
    createdAt: true,
    key: true,
    _id: false
  })
  
}

module.exports= { getAllDocs }