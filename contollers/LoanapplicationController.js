const axios = require('axios')
async function getLoanRecords(url, headers, sheetId, criteria, sort, start, limit) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
      'limit': limit,
      'sort': sort,
      "start": start,
    };
  
    const response = await axios.post(url, payload, { headers });
    return response.data.data;
  }
  module.exports = getLoanRecords;