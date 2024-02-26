const getTestLoanRecords = require('../contollers/TeatloanController');

const TestLoans = async (req, res) => {
    console.log("r test loans request",req)
    try {
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
            'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_TEST_LOAN_APPLICATION_SHEET_ID;
        // Get criteria from request query parameters
        const criteria = req.query.criteria || '';
        const testLoanRecords = await getTestLoanRecords(url, headers, sheetId, criteria);
        console.log('testloans',testLoanRecords)
        res.send({ data: testLoanRecords });
    } catch (err) {
        console.error('Error in fetching data: test loans', err.message);
        res.status(500).send('Internal Server Error');
    }
  }

  module.exports = TestLoans;