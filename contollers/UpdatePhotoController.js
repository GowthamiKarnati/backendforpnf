const axios = require('axios');
async function getUpdatePhoto(url, headers, sheetId, recordId, data) {
    const payload = {
      'sheet_id': sheetId,
      'record_id': recordId,
      'data': data
    };
    console.log("payload  ......",payload);
    const response = await axios.post(url, payload, { headers });
    return response.data;
  }

  module.exports = getUpdatePhoto;