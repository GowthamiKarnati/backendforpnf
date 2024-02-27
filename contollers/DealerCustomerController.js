const axios = require('axios')
async function getdCustomersRecords(url, headers, sheetId, criteria) {
    const payload = {
        'sheet_id': sheetId,
        'criteria': criteria,
    };
  
    const response = await axios.post(url, payload, { headers });
    //console.log('All Records from Tigersheet Backend for Customers', response.data);
  
    return response.data.data;
  }

  module.exports = getdCustomersRecords