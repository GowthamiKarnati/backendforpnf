const axios = require('axios')
async function getLoanRecords(url, headers, sheetId, criteria, limit) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
      'limit': limit
    };
  
    const response = await axios.post(url, payload, { headers });
    return response.data.data;
  }
  module.exports = getLoanRecords;