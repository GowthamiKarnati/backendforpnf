const axios = require('axios');
async function getTyreData(url, headers, sheetId,recordId, data) {
    const payload = {
      'sheet_id': sheetId,
      'record_id': recordId,
      'data': data
    }
    const response = await axios.post(url, payload, { headers });
    //console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data;
  }
module.exports = getTyreData; 