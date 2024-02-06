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
const bodyParser = require('body-parser');
dotenv.config(); 

const app = express();
const Port = process.env.PORT || 5000;
const customerRouter = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
  app.get('/tyreloans', async (req, res) => {
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
  });
  
  async function getTyreLoansRecords(url, headers, sheetId, criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    };
  
    const response = await axios.post(url, payload, { headers });
    console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data.data;
  }

  app.use('/customer', customerRouter);
  customerRouter.get('/',async (req,res)=>{
    try{
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
        const criteria = req.query.criteria || '';;
        const cdloansRecords = await getcustomerRecords(url, headers, sheetId,criteria);
        res.send({data:cdloansRecords})

    }catch(err){
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
})

async function getcustomerRecords(url, headers, sheetId,criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    //   'sort':JSON.stringify([{"property":"column_85","direction":"desc"}])
    };
    const response = await axios.post(url, payload, { headers });
    console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data.data;
}

customerRouter.get('/trucks',async (req,res)=>{
    try{
        const url = process.env.TIGERSHEET_API_URL;
        const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        const sheetId = process.env.TIGERSHEET_TRUCK_SHEET_ID;
        // Get criteria from request query parameters
        const criteria = req.query.criteria || '';;
        const truckRecords = await gettruckRecords(url, headers, sheetId,criteria);
        res.send({data:truckRecords})

    }catch(err){
        console.error('Error in fetching data:', err.message);
        res.status(500).send('Internal Server Error');
    }
})

async function gettruckRecords(url, headers, sheetId,criteria) {
    const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
    };
    const response = await axios.post(url, payload, { headers });
    console.log('All Records from Tigersheet Backend', response.data);
  
    return response.data.data;
}



//   app.get('/customers', async (req, res) => {
//     try {
//         const url = process.env.TIGERSHEET_API_URL;
//         const headers = {
//             'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
//         // Get criteria from request query parameters
//         const criteria = req.query.criteria || '';
//         const customersRecords = await getCustomersRecords(url, headers, sheetId, criteria);
//         res.send({ data: customersRecords });

//     } catch (err) {
//         console.error('Error in fetching data:', err.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// async function getCustomersRecords(url, headers, sheetId, criteria) {
//     const payload = {
//         'sheet_id': sheetId,
//         'criteria': criteria,
//     };

//     const response = await axios.post(url, payload, { headers });
//     console.log('All Records from Tigersheet Backend for Customers', response.data);

//     return response.data.data;
// }





// app.post("/create",async (req,res)=>{
//   try{
//       const url=process.env.TIGERSHEET_API_CREATE_URL;
//       const headers={
//           'Authorization':'C9B53439FA03FB946C93E9AC9963070B221EC0E3CD66399A',
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//       const sheetId = 30273103
      
//       const data = JSON.stringify({"30526":{"value":"9"}, "30527":{"value":"good year"}, "30528":{"value":"1000"}, "31816":{"value":"SADANAND AMLE"}, "31817":{"value":"BSVPA5781Q"}, "31818":{"value":"+919130858727"}, "31819":{"value":"+917020490374"},"32046": { "value": "Married" },
//       "32047": { "value": 2 },
//       "32048": { "value": "Bungalow" },
//       "32049": { "value": "ABC123" },
//       "32050": { "value": "2024-01-24" },
//       "32051": { "value": "Online" }});
//       const tyreData= await getTyreData(url,headers,sheetId,data);
//       console.log('TyreData: ', tyreData)

//       res.send({data:tyreData})
      
//   }catch(err){
//       console.error('Error in fetching data:', err.message);
//       res.status(500).send('Internal Server Error');
//   }
// });

// async function getTyreData(url,headers,sheetId,data){
//   const payload={
//       'sheet_id':sheetId,
//       'data':data
//   }
//   const response = await axios.post(url, payload, { headers });
//   console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
//  }
// app.post("/create", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_CREATE_URL;
//     const headers = {
//       'Authorization': 'C9B53439FA03FB946C93E9AC9963070B221EC0E3CD66399A',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };
//     const sheetId = 30273103;

//     // Extract data from the request body
//     const { numberOfTires, selectedBrand, loanAmount, name, pan, mobilenumber, alternatemobile, martialstatus, numofchildren, housetype, trucknumber, date, source,numberoftrucks } = req.body;


//      const data = JSON.stringify({
//       "30526": { "value": numberOfTires },
//       "30527": { "value": selectedBrand },
//       "30528": { "value": loanAmount },
//       "31816": { "value": name },
//       "31817": { "value": pan },
//       "31818": { "value": mobilenumber },
//       "31819": { "value": alternatemobile },
//       "32046": { "value": martialstatus },
//       "32047": { "value": numofchildren },
//       "32048": { "value": housetype },
//       "32049": { "value": trucknumber },
//       "32050": { "value": date },
//       "32051": { "value": source },
//       "32053": {"value": numberoftrucks}
//     });

//     const tyreData = await getTyreData(url, headers, sheetId, data);
//     console.log('TyreData:', tyreData);

//     res.send({ data: tyreData });

//   } catch (err) {
//     console.error('Error in fetching data:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });
// async function getTyreData(url, headers, sheetId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'data': data
//   }
//   const response = await axios.post(url, payload, { headers });
//   console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }
app.post("/create", async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_CREATE_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const sheetId = 59283844;

    
    const { numberOfTires, selectedBrand, loanAmount, name, pan, mobilenumber, alternatemobile, martialstatus, numofchildren, housetype, trucknumber, date,numberoftrucks,source } = req.body;
    const sourceValue = source ? source : 'null';
    const sourceJsonValue = JSON.stringify({
      "reference_column_id": 236,
      "value": sourceValue
  });

     const data = JSON.stringify({
      "806": { "value": numberOfTires },
      "855": { "value": selectedBrand },
      "805": { "value": loanAmount },
      "791": { "value": name },
      "792": { "value": pan },
      "793": { "value": mobilenumber },
      "794": { "value": alternatemobile },
      "800": { "value": martialstatus },
      "801": { "value": numofchildren },
      "802": { "value": housetype },
      "803": { "value": trucknumber },
      "790": { "value": date },
      "810": {"value": pan},
      "795": {"value": numberoftrucks},
      "807":{"value":sourceJsonValue},
    });
    
    

    const tyreData = await getTyreData(url, headers, sheetId, data);
    console.log('TyreData:', tyreData);

    res.send({ data: tyreData });

  } catch (err) {
    console.error('Error in fetching data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});
async function getTyreData(url, headers, sheetId, data) {
  const payload = {
    'sheet_id': sheetId,
    'data': data
  }
  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend', response.data);

  return response.data;
}


app.get('/customerKyc', async (req, res) => {
  try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
          'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_CUSTOMER_KYC_SHEET_ID;
      // Get criteria from request query parameters
      const criteria = req.query.criteria || '';
      const customerKycRecords = await getCustomerKycRecords(url, headers, sheetId, criteria);
      res.send({ data: customerKycRecords });
  } catch (err) {
      console.error('Error in fetching customerKyc data:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

async function getCustomerKycRecords(url, headers, sheetId, criteria) {
  const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
  };

  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend', response.data);

  return response.data.data;
}
app.get('/dealers', async (req, res) => {
  try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
          'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_DEALERS_SHEET_ID;
      // Get criteria from request query parameters
      const criteria = req.query.criteria || '';
      const customersRecords = await getCustomersRecords(url, headers, sheetId, criteria);
      res.send({ data: customersRecords });

  } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

async function getCustomersRecords(url, headers, sheetId, criteria) {
  const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
  };

  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend for Customers', response.data);

  return response.data.data;
}
app.get('/customers', async (req, res) => {
  try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
          'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_CUSTOMERS_SHEET_ID;
      // Get criteria from request query parameters
      const criteria = req.query.criteria || '';
      const customersRecords = await getCustomersRecords(url, headers, sheetId, criteria);
      res.send({ data: customersRecords });

  } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

async function getCustomersRecords(url, headers, sheetId, criteria) {
  const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
  };

  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend for Customers', response.data);

  return response.data.data;
}
app.get('/vehicles', async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const sheetId = process.env.TIGERSHEET_VEHICLE_SHEET_ID;
    const criteria = req.query.criteria || '';

    const vehicleRecords = await getVehicleRecords(url, headers, sheetId, criteria);
    res.send({ data: vehicleRecords });

  } catch (err) {
    console.error('Error in fetching data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

async function getVehicleRecords(url, headers, sheetId, criteria) {
  const payload = {
    'sheet_id': sheetId,
    'criteria': criteria,
  };

  const response = await axios.post(url, payload, { headers });
  console.log('All Records from Tigersheet Backend for Vehicles', response.data);

  return response.data.data;
}
app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});