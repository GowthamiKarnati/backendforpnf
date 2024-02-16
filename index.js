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
const admin = require('firebase-admin');
const cron = require('node-cron');
var serviceAccount = require("./dealer-77fe8-firebase-adminsdk-x1y4o-a17271680b.json")
dotenv.config(); 

const app = express();
const Port = process.env.PORT || 5000;
const customerRouter = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let tokens =[]
const firestore = admin.firestore()
const messaging = admin.messaging();


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
        const criteria = req.query.criteria || '';
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
    //console.log('All Records from Tigersheet Backend', response.data);
  
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
    //console.log('All Records from Tigersheet Backend', response.data);
  
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

    
    const { numberOfTires, selectedBrand, loanAmount, name, pan, mobilenumber, alternatemobile, martialstatus, numofchildren, housetype, trucknumber, date,numberoftrucks,source, insurancetype, monthlyemioutflow,numberOfYearsInBusiness,Totaldriversalary } = req.body;
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
      "807": {"value":sourceJsonValue},
      "1208":{"value":insurancetype},
      "798": {"value": monthlyemioutflow},
      "796": {"value": numberOfYearsInBusiness},
      "804":{"value": Totaldriversalary}
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
  //console.log('All Records from Tigersheet Backend', response.data);

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
  //console.log('All Records from Tigersheet Backend', response.data);

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
  //console.log('All Records from Tigersheet Backend for Customers', response.data);

  return response.data.data;
}

app.get('/dealers/getUniqueDealers', async (req, res) => {
  try {
      const url = process.env.TIGERSHEET_API_URL;
      const headers = {
          'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = process.env.TIGERSHEET_DEALERS_SHEET_ID;
      // Get criteria from request query parameters
      const criteria = req.query.criteria || '';
      // const uniqueDealers = await getUniqueDealer(url, headers, sheetId, criteria);
      const uniqueDealers = await getUniqueDealer();

      res.send({ data: uniqueDealers });

  } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

async function getUniqueDealer(){
  // const response = await axios.post(url, payload, { headers });
  const response = await axios.get("https://backendforpnf.vercel.app/dealers")
//console.log('All Records from Tigersheet Backend for Customers', response.data);

  const sourceToMobileNumberMapping = {};
  // console.log("res:",response);
  // console.log("dataa:", response.data.data);
  const dealers = response.data.data;
  for(const dealer of dealers){
    sourceToMobileNumberMapping[dealer.dealer] = dealer.phone;
  }
  // console.log(sourceToMobileNumberMapping);
  return sourceToMobileNumberMapping;
  // const dealerMobileNumber = response.data.data[0]?.['phone'];

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
  //console.log('All Records from Tigersheet Backend for Customers', response.data);

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
  //console.log('All Records from Tigersheet Backend for Vehicles', response.data);

  return response.data.data;
}
app.get('/testloans', async (req, res) => {
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
      res.send({ data: testLoanRecords });
  } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

async function getTestLoanRecords(url, headers, sheetId, criteria) {
  const payload = {
      'sheet_id': sheetId,
      'criteria': criteria,
  };


  const response = await axios.post(url, payload, { headers });
  //console.log('All Records from Tigersheet Backend', response.data);

  return response.data.data;
}

async function sendMulticastMessage(messageData, tokens) {
  //console.log(messageData)
  try {
    const message = {
      // notification: messageData, // Custom data for the message
      notification:{
          title:messageData.title,
          body:messageData.body
      },
      // tokens: tokens, // Array of FCM tokens to send the message to
      token: tokens, // Array of FCM tokens to send the message to
      android: {
          notification: {
            // Set priority to high for prompt delivery
            priority: 'high',
          },
        },
    };

  //   const response = await messaging.sendMulticast(message);
    const response = await messaging.send(message);
   //console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error; 
  }
}


const currentTime = new Date();

// Get the time 30 minutes ago
const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes * 60 seconds * 1000 milliseconds

// Format the current time with date
const currentFormattedTime = formatTime(currentTime);

// Format the time 30 minutes ago with date
const thirtyMinutesAgoFormattedTime = formatTime(thirtyMinutesAgo);
console.log(`Time 30 minutes ago with date: ${thirtyMinutesAgoFormattedTime}`);
console.log(`Current time with date: ${currentFormattedTime}`);


// Function to format time as "YYYY-MM-DD HH:mm:ss"
function formatTime(time) {
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



// async function getCustomersWithSanctionedStatus() {
//   const sheetId = '59283844';
//   const criteria = 'sheet_59283844.column_821="sanctioned"';
//   //const apiUrl = `https://pnf.tigersheet.com/api/sheet-api/get-records?sheet_id=${sheetId}&criteria='%22${encodeURIComponent(criteria)}%22'`;
//   const apiUrl=`https://backendforpnf.vercel.app/testloans?criteria=sheet_59283844.column_821=%22sanctioned%22`
//   //console.log('Fetching customers...');
//   const response = await axios.get(apiUrl);

//   if (response.status !== 200) {
//     throw new Error('Failed to fetch data from the Tigersheet API.');
//   }

//   const customers = response.data.data;
//   console.log('Customers:', customers);
   
//   const dealerMobileNumbers = [];

//   const uniqueDealersResponse = await getUniqueDealer();
//   //console.log("response:", uniqueDealersResponse);

//   const sourceToMobileNumberMapping = uniqueDealersResponse;

//   for (const customer of customers) {
//     const source = customer.Source;
//     const fullname = customer['Full Name']
//     //console.log("source", source)
//     const dealerMobileNumber = sourceToMobileNumberMapping[source]; 
    
//     dealerMobileNumbers.push({ source, dealerMobileNumber, fullname });
//   }
//   //console.log('Dealer Mobile Number:', dealerMobileNumbers);

//   return dealerMobileNumbers;

// }


async function getCustomersWithSanctionedStatus() {
  try {
    const sheetId = '59283844';
    const criteria = `sheet_59283844.column_821="sanctioned"`;

    const apiUrl = `https://backendforpnf.vercel.app/testloans?criteria=${encodeURIComponent(criteria)}`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error('Failed to fetch data from the API.');
    }

    const currentTime = new Date();
    const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes * 60 seconds * 1000 milliseconds

    const currentFormattedTime = formatTime(currentTime);
    const thirtyMinutesAgoFormattedTime = formatTime(thirtyMinutesAgo);
    console.log(`Current time with date: ${currentFormattedTime}`);
    console.log(`Time 30 minutes ago with date: ${thirtyMinutesAgoFormattedTime}`);

    const customers = response.data.data;

    const filteredCustomers = customers.filter(customer => {
      const lastStatusUpdatedAt = new Date(customer['Last Status Updated At']);
      return lastStatusUpdatedAt >= thirtyMinutesAgo && lastStatusUpdatedAt <= currentTime;
    });

    console.log(`Number of customers updated within the last 30 minutes: ${filteredCustomers.length}`);

    const dealerMobileNumbers = [];
    const uniqueDealersResponse = await getUniqueDealer();
    const sourceToMobileNumberMapping = uniqueDealersResponse;

    for (const customer of filteredCustomers) {
      const source = customer.Source;
      const fullname = customer['Full Name'];
      const dealerMobileNumber = sourceToMobileNumberMapping[source];
      dealerMobileNumbers.push({ source, dealerMobileNumber, fullname });
    }

    return dealerMobileNumbers;
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    return [];
  }
}

function formatTime(time) {
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage
getCustomersWithSanctionedStatus().then(dealerMobileNumbers => {
  console.log("Dealer Mobile Numbers:", dealerMobileNumbers);
}).catch(error => {
  console.error("Error:", error);
});






async function main() {
  //const CustomersWithSanctionedStatus = await getCustomersWithSanctionedStatus();
//   //const res = await getUniqueDealer()
//   //console.log("source to mobile mappping:", res);
//   try {
//     const CustomersWithSanctionedStatus = await getCustomersWithSanctionedStatus();
//     const lastCustomer = CustomersWithSanctionedStatus[CustomersWithSanctionedStatus.length - 1];
//     //console.log(lastCustomer)
//     const mobile = lastCustomer.dealerMobileNumber.slice(-10);
//     const name = lastCustomer.fullname;

//     const snapshot = await firestore.collection('dealers').get();
//     const tokens = new Map();
//     snapshot.forEach(doc => {
//       const mobile = doc.id.slice(-10);
//       const token = doc.data().token;
//       tokens.set(mobile, token);
//     });

//     if (tokens.has(mobile)) {
//       const tokenToNotify = tokens.get(mobile);
//       //console.log("token",tokenToNotify)
//       const notificationData = {
//         title: `Loan Approved `,
//         body: `Loan approved for ${name}`,

//       };
//       await sendMulticastMessage(notificationData, tokenToNotify);

//       //console.log(`Notification sent for ${name}`);
//     } else {
//       console.log(`No token found for mobile number: ${mobile}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
try {
  const dealerMobileNumbers = await getCustomersWithSanctionedStatus();

  for (const customer of dealerMobileNumbers) {
    const mobile = customer.dealerMobileNumber.slice(-10);
    const name = customer.fullname;

    const snapshot = await firestore.collection('dealers').get();
    const tokens = new Map();
    snapshot.forEach(doc => {
      const dealerMobile = doc.id.slice(-10);
      const token = doc.data().token;
      tokens.set(dealerMobile, token);
    });

    if (tokens.has(mobile)) {
      const tokenToNotify = tokens.get(mobile);
      const notificationData = {
        title: `Loan Approved `,
        body: `Loan approved for ${name}`,
      };
      await sendMulticastMessage(notificationData, tokenToNotify);
      console.log(`Notification sent for ${name}`);
    } else {
      console.log(`No token found for mobile number: ${mobile}`);
    }
  }
} catch (error) {
  console.error('Error:', error);
}

}

//setInterval(main, 20000);
// const intervalInMinutes = 30;
// const intervalInMilliseconds = intervalInMinutes * 60 * 1000;
// setInterval(main, intervalInMilliseconds);
// main();
app.get('/api/cron', main)

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});