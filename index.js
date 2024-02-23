const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const _ = require('lodash');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cron = require('node-cron');
const Emiroutes =  require('./routes/Emiroutes');
const TyreLoanData = require('./routes/TyreloanRoutes');
const customerRoutes = require('./routes/CustomerRoute');
const UpdateData = require('./routes/UpdateRoute');
const CustomerKycData = require('./routes/CustomerKycRoute')
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


app.use('/emi', Emiroutes)
app.use('/tyreloans', TyreLoanData);
app.use('/customer', customerRoutes)



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
app.post("/updatedob", async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_UPDATE_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const sheetId = 42284627;
    const {record_id, dob,pan, noofchildren,monthlyemioutflow, housetype,noofyearsinbusiness, } =  req.body;
    const recordId = record_id;
    
    

     const data = JSON.stringify({
      "1091": {
        "value": dob
      },
      "1089":{
          "value": pan
      },
      "1093":{
        "value":noofchildren
      },
      "1094":{
        "value":monthlyemioutflow
      },
      "1096":{
        "value": housetype
      },
      "1101":{
        "value":noofyearsinbusiness
      }
    });
    
    

    const tyreData = await getTyreData(url, headers, sheetId,recordId, data);
    console.log('TyreData:', tyreData);

    res.send({ data: tyreData });

  } catch (err) {
    console.error('Error in fetching data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});
async function getTyreData(url, headers, sheetId,recordId, data) {
  const payload = {
    'sheet_id': sheetId,
    'record_id': recordId,
    'data': data
  }
  const response = await axios.post(url, payload, { headers });
  //console.log('All Records from Tigersheet Backend', response.data);

  return response.data;
}
// app.post("/updateKyc", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_UPDATE_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };
//     const sheetId = 42284627;
//     //const {record_id,dob,pan,noofchildren,monthlyemioutflow, housetype,noofyearsinbusiness} = req.body;
//     const recordId = 329;
//      const data = JSON.stringify({
//       "1091":{
//         "value":"11/09/2001"
//       },
//       // "1090":{
//       //   "value":pan
//       // },
//       // "1093":{
//       //   "value":noofchildren
//       // },
//       // "1094":{
//       //   "value":monthlyemioutflow
//       // },
//       // "1096":{
//       //   "value":housetype
//       // },
//       // "1101":{
//       //   "value":noofyearsinbusiness
//       // }
//     });
//     const UpdateData = await getUpdateData(url, headers, sheetId,recordId, data);

//     res.send({ data: UpdateData });

//   } catch (err) {
//     console.error('Error in fetching data:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });
// async function getUpdateData(url, headers, sheetId,recordId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'record_id': recordId,
//     'data': data,
//   }
//   const response = await axios.post(url, payload, { headers });
//   console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }
// app.post("/updateKyc", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_UPDATE_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'application/json'
//     };
//     const sheetId = 42284627;
//     const { record_id, dob } = req.body; // Assuming only updating date of birth
//     const recordId = "329";
    
//     const data = {
//       "1091": {
//         "value": "11/09/2001"
//       }
//     };

//     const UpdateData = await getUpdateData(url, headers, sheetId, recordId, data);
//     console.log(UpdateData);
    
//     res.json({ data: UpdateData });

//   } catch (err) {
//     console.error('Error in fetching data:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// async function getUpdateData(url, headers, sheetId, recordId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'record_id': recordId,
//     'data': data,
//   };

//   const response = await axios.post(url, payload, { headers });
//   console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }

// app.post("/updatePhoto", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_UPDATE_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'multipart/image'
//     };
//     const sheetId = 42284627;
//     const {record_id,image} = req.body;
//     console.log(image)
//     const recordId = record_id;
//     const duumy = `[{\"name\":\"${image}\"}]`
//     // console.log(duumy)
//      const data = JSON.stringify({
//       "1088":{
//         "value":image
//         // "value": `[{\"name\":\"photo.jpg\",\"filepath\":\"${image}\",\"fullpath\":\"http://tigersheet.s3.amazonaws.com/${image}\",\"is_new\":true,\"size\":\"\"}]`
//       }
//     });
//     const UpdateData = await getUpdateData(url, headers, sheetId,recordId, data);

//     res.send({ data: UpdateData });

//   } catch (err) {
//     console.error('Error in fetching data:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });
// async function getUpdateData(url, headers, sheetId,recordId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'record_id': recordId,
//     'data': data,
//   }
//   const response = await axios.post(url, payload, { headers });
//   //console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }


app.post("/fileUpload", async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_FILE_UPLOAD_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'multipart/form-data'
    };
    console.log(req.body)
    // const UpdateData = await getUpdateData(url, headers,  formdata);

    // res.send({ data: UpdateData });
    return res.json({ msg: "Image Uploaded"})

  } catch (err) {
    console.error('Error in fetching data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});
async function getUpdateData(url, headers,formdata) {
  const payload = {
    'formdata': formdata,
  }
  const response = await axios.post(url, payload, { headers });

  return response.data;
}






















app.use("/updatePhoto",UpdateData);
app.use('/customerKyc', CustomerKycData);
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
app.get('/loanapplication', async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const sheetId = process.env.TIGERSHEET_LOAN_APPLICATION_SHEET_ID; // Use the environment variable
    const criteria = req.query.criteria || '';
    const loanApplicationRecords = await getLoanRecords(url, headers, sheetId, criteria);
    console.log('Loan application records:', loanApplicationRecords);
    res.send({ data: loanApplicationRecords });
  } catch (err) {
    console.error('Error in fetching loan application data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

async function getLoanRecords(url, headers, sheetId, criteria) {
  const payload = {
    'sheet_id': sheetId,
    'criteria': criteria,
  };

  const response = await axios.post(url, payload, { headers });
  return response.data.data;
}

app.post('/workflow', async (req, res) => {
  const source = req.body.loan_id;
  const name =  req.body.name;
  const mobilenumber =  req.body.mobilenumber;
  const dealer =  req.body.source;
  //console.log("loanid is requires", source)
  //console.log("name", name);
  ////console.log("mobile number", mobilenumber)
  //console.log("dealer", dealer)
  try {
    await main(source, name, mobilenumber);
    res.json({ message: 'Main function called successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while calling main function' });
  }
  
});

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
        data:{
          name:messageData.name,
          mobilenumber: messageData.mobilenumber
        }
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

async function main(source, name, mobilenumber) {
  try {
    // Your main function logic here...
    console.log('Source:', source);
    console.log('Name:', name);
    console.log('Mobile Number:', mobilenumber);

    const uniqueDealersResponse = await getUniqueDealer();
    const sourceToMobileNumberMapping = uniqueDealersResponse;
    //console.log(sourceToMobileNumberMapping)
    const sourceMobileNumber = sourceToMobileNumberMapping[source];
    console.log(sourceMobileNumber);
    const mobile = sourceMobileNumber.slice(-10);
    const snapshot = await firestore.collection('dealers').get();
    const tokens = new Map();
    snapshot.forEach(doc => {
      const mobile = doc.id.slice(-10);
      const token = doc.data().token;
      tokens.set(mobile, token);
    });

    if (tokens.has(mobile)) {
      const tokenToNotify = tokens.get(mobile);
      //console.log("token",tokenToNotify)
      const notificationData = {
        title: `Loan Approved `,
        body: `Loan approved for ${name}`,
        mobilenumber : `${mobilenumber}`,
        name :`${name}`

      };
      await sendMulticastMessage(notificationData, tokenToNotify);

      console.log(`Notification sent for ${name}`);
    } else {
      console.log(`No token found for mobile number: ${mobile}`);
    }



  } catch (error) {
    console.error('Error in main function:', error);
    throw error; // Rethrow the error to handle it in the route handler if needed
  }
}
//main();




app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});