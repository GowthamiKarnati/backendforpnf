const getLoanRecords = require('../contollers/LoanapplicationController');
const LoanApplications = async (req, res) => {
  console.log(req.query.limit)
    try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_LOAN_APPLICATION_SHEET_ID; 
      const criteria = req.query.criteria || '';
      const limit = req.query.limit || 1000;
      const loanApplicationRecords = await getLoanRecords(url, headers, sheetId, criteria, limit);


      console.log('Loan application recordsssss:', loanApplicationRecords.record_id === 11);
      res.send({ data: loanApplicationRecords });
    } catch (err) {
      console.error('Error in fetching loan application data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = LoanApplications;