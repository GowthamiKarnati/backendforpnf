const express = require('express');
const axios = require('axios');

const router = express.Router();

async function getcdloansRecords(url, headers, sheetId, criteria) {
    const payload = {
        'sheet_id': sheetId,
        'criteria': criteria,
    };

    const response = await axios.post(url, payload, { headers });
    //console.log('All Records from Tigersheet Backend', response.data);

    return response.data.data;
}

router.get('/', async (req, res) => {
    try {
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
            'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_CDLOANS_SHEET_ID;
        const criteria = req.query.criteria || '';
        const cdloansRecords = await getcdloansRecords(url, headers, sheetId, criteria);
        res.send({ data: cdloansRecords });
    } catch (err) {
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
