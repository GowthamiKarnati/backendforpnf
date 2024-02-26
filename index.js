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
const CustomerKycData = require('./routes/CustomerKycRoute');
const DealerData = require('./routes/DealerRoute');
const VehicleData = require('./routes/VehicleRoute');
const TestLoans = require('./routes/TestloanRoute');
const LoanApplications = require('./routes/LoanApplicationRoute');
const FormData = require('form-data')
var serviceAccount = require("./dealer-77fe8-firebase-adminsdk-x1y4o-a17271680b.json")
const multer  = require('multer');
dotenv.config(); 

const app = express();
const Port = process.env.PORT || 5000;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let tokens =[]
const firestore = admin.firestore()
const messaging = admin.messaging();


const ds=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,"uploads/")
  },
  filename:(req,file,cb)=>{

      cb(null,Date.now()+file.originalname)

  }
});


const upload =multer({
  storage:ds
});







app.get('/', (req, res) => {
    res.send('Hello, welcome to PNF Loan Backend!');
});


app.use('/emi', Emiroutes)
app.use('/tyreloans', TyreLoanData);
app.use('/customer', customerRoutes);
app.use('/customerKyc', CustomerKycData);
app.use('/dealers', DealerData);
app.use('/vehicles', VehicleData);
app.use('/testloans', TestLoans);
app.use('/loanapplication', LoanApplications);
app.use('/updatedob', UpdateData)
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
// app.post("/updatedob", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_UPDATE_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };
//     const sheetId = 42284627;
//     const {record_id, dob,pan, noofchildren,monthlyemioutflow, housetype,noofyearsinbusiness, } =  req.body;
//     const recordId = record_id;
    
    

//      const data = JSON.stringify({
//       "1091": {
//         "value": dob
//       },
//       "1089":{
//           "value": pan
//       },
//       "1093":{
//         "value":noofchildren
//       },
//       "1094":{
//         "value":monthlyemioutflow
//       },
//       "1096":{
//         "value": housetype
//       },
//       "1101":{
//         "value":noofyearsinbusiness
//       }
//     });
    
    

//     const tyreData = await getTyreData(url, headers, sheetId,recordId, data);
//     console.log('TyreData:', tyreData);

//     res.send({ data: tyreData });

//   } catch (err) {
//     console.error('Error in fetching data:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });
// async function getTyreData(url, headers, sheetId,recordId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'record_id': recordId,
//     'data': data
//   }
//   const response = await axios.post(url, payload, { headers });
//   //console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }

// app.post("/fileUpload", upload.single('file'), async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_FILE_UPLOAD_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'multipart/form-data'
//     };
    
//     // req.file contains the uploaded file
//     console.log(req.file);

//     // Create an array to hold file data
//     let Filedata = [];

//     // Push the uploaded file object into the array
//     Filedata.push(req.file);

//     // Create a FormData object to hold the file data
    
//     // Process the uploaded file, if needed
//     //const fileresponse = await axios.post(url, Filedata, { headers });

//     return res.json({ msg: "uploaded" });

//   } catch (err) {
//     console.error('Error in uploading file:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post("/fileUpload", async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_FILE_UPLOAD_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'multipart/form-data'
    };
    const base64Data = req.body.base64Data;
    //console.log("Base64 data received:", base64Data);
    const fileName = "image.jpg";
    var formData = new FormData();
    let bf = Buffer.from(base64Data, "base64");
    formData.append("Filedata[]", bf, fileName);
    const fileresponse = await axios.post(url, formData, { headers });
    return res.json({ msg: fileresponse.data });

  } catch (err) {
    console.error('Error in receiving base64 data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});


// app.post("/updatePhoto", async (req, res) => {
//   try {
//     const url = process.env.TIGERSHEET_API_UPDATE_URL;
//     const headers = {
//       'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };
    
//     const sheetId = 42284627;
//     const { record_id, files } = req.body;
//     const recordId = record_id
//     console.log("Files:", files);
//     files.forEach(file => {
//       console.log("Name:", file.name);
//       console.log("Uploaded Name:", file.uploaded_name);
//       console.log("Path:", file.path);
//       console.log("Size:", file.size);
//       console.log("Status:", file.status);
//     });
//     files.forEach(file => {
//       const data = JSON.stringify({
//         "1088": {
//           "value": `[{
//             \"name\":\"${file.name}\",
//             \"uploaded_name\":\"${file.uploaded_name}\",
//             \"path\":\"${file.path}\",
//             \"size\":\"${file.size}\",
//             \"status\":\"${file.status}\",
//             \"filepath\":\"${file.uploaded_name}\",
//             \"fullpath\":\"${file.path}\"
//           }]`
         
//         }
//      });
//      const PhotoData = await getUpdatePhoto(url, headers, sheetId,recordId, data);
//     console.log('PhotoData:', PhotoData);

//     res.send({ data: PhotoData });
//     });
    
    
//     const PhotoData = await getUpdatePhoto(url, headers, sheetId,recordId, data);
//     console.log('PhotoData:', PhotoData);

//     res.send({ data: PhotoData });
//     //res.send({ msg: "Files received successfully" });

//   } catch (err) {
//     console.error('Error in updating photo:', err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// async function getUpdatePhoto(url, headers, sheetId,recordId, data) {
//   const payload = {
//     'sheet_id': sheetId,
//     'record_id': recordId,
//     'data': data
//   }
//   const response = await axios.post(url, payload, { headers });
//   //console.log('All Records from Tigersheet Backend', response.data);

//   return response.data;
// }

app.post("/updatePhoto", async (req, res) => {
  try {
    const url = process.env.TIGERSHEET_API_UPDATE_URL;
    const headers = {
      'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    
    const sheetId = 42284627;
    const { record_id, files } = req.body;
    const recordId = record_id;
    console.log("Files:", files);

    // Loop through each file
    for (const file of files) {
      console.log("Name:", file.name);
      console.log("Uploaded Name:", file.uploaded_name);
      console.log("Path:", file.path);
      console.log("Size:", file.size);
      console.log("Status:", file.status);

      // Construct data for the file
      const data = JSON.stringify({
        "1088": {
          "value": `[{
            "name":"${file.name}",
            "uploaded_name":"${file.uploaded_name}",
            "path":"${file.path}",
            "size":"${file.size}",
            "status":"${file.status}",
            "filepath":"${file.uploaded_name}",
            "fullpath":"${file.path}"
          }]`
        }
      });

      // Call the update function for each file
      const PhotoData = await getUpdatePhoto(url, headers, sheetId, recordId, data);
      console.log('PhotoData:', PhotoData);
    }

    res.send({ msg: "Files updated successfully" });
  } catch (err) {
    console.error('Error in updating photo:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

async function getUpdatePhoto(url, headers, sheetId, recordId, data) {
  const payload = {
    'sheet_id': sheetId,
    'record_id': recordId,
    'data': data
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
}

















//app.use("/updatePhoto",UpdateData);


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