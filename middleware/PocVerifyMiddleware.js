const getPOCrecords = require('../contollers/PocVerifyController');
const VerifiedPoc = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_ONDC;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_ONDC_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = 58675056;
  
      // Get the cleaned value from request query parameters
      const cleanedValue = req.query.verifyValue || '';
      console.log(cleanedValue);
  
      // Construct the criteria string
      const criteria = `sheet_${sheetId}.column_75="${cleanedValue}"`;
      const limit = 1;
      const columns = 'column_74, column_75';
  
      // Fetch the records
      const customersRecords = await getDealersRecords(url, headers, sheetId, criteria, limit, columns);
      
      // Send the response with fetched data
      res.send({ data: customersRecords });
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      
      // Send an error response
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = VerifiedPoc;