const axios = require('axios')
async function getLoanRecords(url, headers, sheetId, criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    };
  
    const response = await axios.post(url, payload, { headers });
    return response.data.data;
  }
  module.exports = getLoanRecords;