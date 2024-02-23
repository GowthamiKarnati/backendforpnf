const getTestLoanRecords =  require('../contollers/TyreLoanController');


const TyreloanData = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_TYRELOANS_SHEET_ID;
      // Get criteria from request query parameters
      const criteria = req.query.criteria || '';
      const tyreLoansRecords = await getTyreLoansRecords(url, headers, sheetId, criteria);
      res.send({ data: tyreLoansRecords });
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = TyreloanData;