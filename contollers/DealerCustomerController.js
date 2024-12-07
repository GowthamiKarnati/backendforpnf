const axios = require('axios')
async function getdCustomersRecords(url, headers, sheetId, criteria, start, limit, sort) {
    const payload = {
        'sheet_id': sheetId,
        'criteria': criteria,
        'start': start,
        'limit': limit,
        'sort': sort
    };
  
    const response = await axios.post(url, payload, { headers });
    //console.log('All Records from Tigersheet Backend for Customers', response.data);
  
    return response.data.data;
  }

  module.exports = getdCustomersRecords