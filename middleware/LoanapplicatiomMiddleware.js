const getLoanRecords = require('../contollers/LoanapplicationController');
const LoanApplications = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_LOAN_APPLICATION_SHEET_ID; 
      const criteria = req.query.criteria || '';
      const sort = req.query.sort || '';
      const limit = parseInt(req.query.limit)|| '';
      const start = parseInt(req.query.start) || '';
      const loanApplicationRecords = await getLoanRecords(url, headers, sheetId, criteria, sort, start, limit);
      console.log('Loan application recordsssss:', loanApplicationRecords?.length);
      res.send({ data: loanApplicationRecords });
    } catch (err) {
      console.error('Error in fetching loan application data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = LoanApplications;