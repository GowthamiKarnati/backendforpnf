// // const getdCustomersRecords = require('../contollers/DealerCustomerController')
// // const DealerCustomers = async (req, res) => {
// //     try {
// //         const url = process.env.TIGERSHEET_API_URL;
// //         const headers = {
// //             'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
// //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// //         };
// //         const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
// //         // Get criteria from request query parameters
// //         const criteria = req.query.criteria || '';
// //         const customersRecords = await getdCustomersRecords(url, headers, sheetId, criteria);
// //         res.send({ data: customersRecords });
  
// //     } catch (err) {
// //         console.error('Error in fetching data:', err.message);
// //         res.status(500).send('Internal Server Error');
// //     }
// //   }

// // module.exports = DealerCustomers;
// // const getdCustomersRecords = require('../contollers/DealerCustomerController')

// // const DealerCustomers = async (req, res) => {
// //     try {
// //         const url = process.env.TIGERSHEET_API_URL;
// //         const headers = {
// //             'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
// //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// //         };
// //         const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
// //         const page = req.query.page ? parseInt(req.query.page) : 1;
// //         console.log(page);
// //         const limit = 10; 

// //         // Calculate startIndex and endIndex for pagination
// //         const startIndex = (page - 1) * limit;
// //         const endIndex = page * limit;

// //         // Fetch customer records based on pagination
// //         const customersRecords = await getdCustomersRecords(url, headers, sheetId);
// //         const paginatedRecords = customersRecords.slice(startIndex, endIndex);
// //         console.log("Pagination Records", paginatedRecords);
// //         res.send({ data: paginatedRecords });


// //     } catch (err) {
// //         console.error('Error in fetching data:', err.message);
// //         res.status(500).send('Internal Server Error');
// //     }
// // }

// // module.exports = DealerCustomers;
// const getdCustomersRecords = require('../contollers/DealerCustomerController')
// const DealerCustomers = async (req, res) => {
//     try {
//         const url = process.env.TIGERSHEET_API_URL;
//         const headers = {
//             'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
//         const page = req.query.page ? parseInt(req.query.page) : 1;
//         const limit = 100; 
//         const searchValue = req.query.search || '';

//         // Fetch customer records
//         const customersRecords = await getdCustomersRecords(url, headers, sheetId);

//         // Filter records based on search value
//         const filteredRecords = customersRecords.filter(record => 
//             record.name.toLowerCase().includes(searchValue.toLowerCase()) ||
//             record['mobile number'].includes(searchValue)
//         );

//         // Paginate the filtered records
//         const startIndex = (page - 1) * limit;
//         const paginatedRecords = filteredRecords.slice(startIndex, startIndex + limit);
//         console.log(paginatedRecords)
//         res.send({ data: paginatedRecords });
//     } catch (err) {
//         console.error('Error in fetching data:', err.message);
//         res.status(500).send('Internal Server Error');
//     }
// }

// module.exports = DealerCustomers;
const getdCustomersRecords = require('../controllers/DealerCustomerController');

const DealerCustomers = async (req, res) => {
    try {
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
            'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 100; 
        const searchValue = req.query.search || '';

        // Fetch customer records
        const customersRecords = await getdCustomersRecords(url, headers, sheetId);

        // Sort records in alphabetical order based on the 'name' field
        const sortedRecords = customersRecords.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        // Filter records based on search value
        const filteredRecords = sortedRecords.filter(record => 
            record.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            record['mobile number'].includes(searchValue)
        );

        // Paginate the filtered records
        const startIndex = (page - 1) * limit;
        const paginatedRecords = filteredRecords.slice(startIndex, startIndex + limit);

        console.log(paginatedRecords);
        res.send({ data: paginatedRecords });
    } catch (err) {
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = DealerCustomers;

