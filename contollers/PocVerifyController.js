const axios =  require('axios');
async function getPOCrecords(url, headers, sheetId, criteria, limit, columns) {
const payload = {
    'sheet_id': sheetId,
    'criteria': criteria,
    'limit' : limit,
    'showFields': columns
};
//console.log(payload)
const response = await axios.post(url, payload, { headers });
//console.log('All Records from Tigersheet Backend for Customers', response.data);

return response.data.data;
}
module.exports = getPOCrecords;
  