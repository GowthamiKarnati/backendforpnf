const getTyreData = require('../contollers/UpdateController')
const UpdateLoanData = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_UPDATE_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = 38562544;
    const{record_id,houseUrl} = req.body;
    const recordId = record_id;
    console.log(req.body);
    console.log(recordId)
      
      
  
       const data = JSON.stringify({
        "1431":{
            "value": houseUrl
        },

      });
      
      
  
      const tyreData = await getTyreData(url, headers, sheetId,recordId, data);
      console.log('TyreData:', tyreData);
  
      res.send({ data: tyreData });
  
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = UpdateLoanData;