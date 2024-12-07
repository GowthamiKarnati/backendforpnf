// const getdCustomersRecords = require('../contollers/DealerCustomerController')
// const DealerCustomers = async (req, res) => {

//     try {
//         const url = process.env.TIGERSHEET_API_URL;
//         const headers = {
//             'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
//         // Get criteria from request query parameters
//         const criteria = req.query.criteria || '';
//         console.log("criteria", criteria)
//         const customersRecords = await getdCustomersRecords(url, headers, sheetId, criteria);
//         console.log(customersRecords.length)
//         res.send({ data: customersRecords });
  
//     } catch (err) {
//         console.error('Error in fetching data:', err.message);
//         res.status(500).send('Internal Server Error');
//     }
//   }

// module.exports = DealerCustomers;
const getdCustomersRecords = require('../contollers/DealerCustomerController')
const DealerCustomers = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
      const criteria = req.query.criteria || '';
      const limit = parseInt(req.query.limit)|| '';
      const start = parseInt(req.query.start) || '';
      const sort = req.query.sort || '';
      const customersRecords = await getdCustomersRecords(url, headers, sheetId, criteria, start, limit, sort);
      res.send({ data: customersRecords });
    } catch (err) {
      console.error('Error in fetching loan application data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = DealerCustomers;