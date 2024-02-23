const getTyreData = require('../contollers/UpdateController');
const UpdateData = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_UPDATE_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = 42284627;
      const {record_id, dob,pan, noofchildren,monthlyemioutflow, housetype,noofyearsinbusiness, } =  req.body;
      const recordId = record_id;
      
      
  
       const data = JSON.stringify({
        "1091": {
          "value": dob
        },
        "1089":{
            "value": pan
        },
        "1093":{
          "value":noofchildren
        },
        "1094":{
          "value":monthlyemioutflow
        },
        "1096":{
          "value": housetype
        },
        "1101":{
          "value":noofyearsinbusiness
        }
      });
      
      
  
      const tyreData = await getTyreData(url, headers, sheetId,recordId, data);
      console.log('TyreData:', tyreData);
  
      res.send({ data: tyreData });
  
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = UpdateData;