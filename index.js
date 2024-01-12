//  const express = require('express');
// const cors = require('cors');
// const axios = require('axios'); 
// const app = express();
// const port = 4002;

// app.use(cors());

// app.get('/', (req, res) => {
//   console.log('Received a request');
//   res.json({ message: 'Hi ' });
// })
// app.get('/sendpostrequest', async (req, res) => {
//   try {
//     const url = 'https://pnf.tigersheet.com/api/sheet-api/get-records';
//     const headers = {
//       'Authorization': '770A4CF28DC6AE0B14D0519C1C5CCE58A53D4553866CD935',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };  
//     const sheetId = '26521917';
//     const criteria = req.query.criteria || '';

//     const allRecords = await getAllRecords(url, headers, sheetId,criteria );
    
//     // Get page and limit from request query parameters
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;

//     // Calculate offset based on page and limit
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;
    
//     // Slice the array to get the records for the current page
//     const paginatedRecords = allRecords.slice(startIndex, endIndex);

//     console.log('Records for Page', page, ':', paginatedRecords);
    
//     res.send({ data: allRecords });

    
//     // const response = await axios.post(url, payload, { headers });
//     // console.log('Response from Tigersheet', response.data);
//     // res.send(response.data);
//   } catch (error) {
//     console.error('Error in post request:', error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });
// async function getAllRecords(url, headers, sheetId, criteria) {
//   const payload = {
//     'sheet_id': sheetId,
//     'criteria': criteria,
//   };

//   const response = await axios.post(url, payload, { headers });
//   console.log('All Records from Tigersheet Backend', response.data);

//   return response.data.data;
// }

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const Port = 5002;

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello, welcome to PNF Loan Backend!');
// });

// app.get('/cdloans',async (req,res)=>{
//     try{
//         const url = 'https://pnf.tigersheet.com/api/sheet-api/get-records';
//         const headers = {
//         'Authorization': '770A4CF28DC6AE0B14D0519C1C5CCE58A53D4553866CD935',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         const sheetId = '23049202';
//         // Get criteria from request query parameters
//         const criteria = req.query.criteria || '';
//         console.log(criteria)
//         const cdloansRecords = await getcdloansRecords(url, headers, sheetId,criteria);
//         res.send({data:cdloansRecords})

//     }catch(err){
//         console.error('Error in fetching data:', err.message);
//         res.status(500).send('Internal Server Error');
//     }
// })

// async function getcdloansRecords(url, headers, sheetId,criteria) {
//     const payload = {
//       'sheet_id': sheetId,
//       'criteria': criteria,
//     };
  
//     const response = await axios.post(url, payload, { headers });
//     console.log('All Records from Tigersheet Backend', response.data);
  
//     return response.data.data;
//   }

// app.get('/emi',async (req,res)=>{
//     try{
//         const url = 'https://pnf.tigersheet.com/api/sheet-api/get-records';
//         const headers = {
//         'Authorization': '770A4CF28DC6AE0B14D0519C1C5CCE58A53D4553866CD935',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         const sheetId = '26521917';
//         // Get criteria from request query parameters
//         const criteria = req.query.criteria || '';
//         const emiRecords = await getemiRecords(url, headers, sheetId,criteria);
//         console.log(emiRecords, 'criteria', criteria);
//         res.send({data:emiRecords})

//     }catch(err){
//         console.error('Error in fetching data:', err.message);
//         res.status(500).send('Internal Server Error');
//     }
// })

// async function getemiRecords(url, headers, sheetId,criteria) {
//     const payload = {
//       'sheet_id': sheetId,
//       'criteria': criteria,
//     };
  
//     const response = await axios.post(url, payload, { headers });
//     console.log('All Records from Tigersheet Backend', response.data);
  
//     return response.data.data;
//   }

// app.listen(Port,()=>{
//     console.log(`Server is running on ${Port}`);
// })

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const _ = require('lodash');

dotenv.config(); 

const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, welcome to PNF Loan Backend!');
});

app.get('/cdloans',async (req,res)=>{
    try{
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_CDLOANS_SHEET_ID;
        // Get criteria from request query parameters
        const criteria = req.query.criteria || '';;
        const cdloansRecords = await getcdloansRecords(url, headers, sheetId,criteria);
        res.send({data:cdloansRecords})

    }catch(err){
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

async function getcdloansRecords(url, headers, sheetId,criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    };
  
    const response = await axios.post(url, payload, { headers });
    console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data.data;
  }

app.get('/emi',async (req,res)=>{
    try{
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_EMI_SHEET_ID;
        // Get criteria from request query parameters
        const criteria = req.query.criteria || '';
        const emiRecords = await getemiRecords(url, headers, sheetId,criteria);
        res.send({data:emiRecords})

    }catch(err){
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
})

async function getemiRecords(url, headers, sheetId,criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    };
  
    const response = await axios.post(url, payload, { headers });
    console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data.data;
  }

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});