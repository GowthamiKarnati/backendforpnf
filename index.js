const express = require('express');
const http = require('http');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const _ = require('lodash');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cron = require('node-cron');
const socketIO = require('socket.io');
const Emiroutes =  require('./routes/Emiroutes');
const TyreLoanData = require('./routes/TyreloanRoutes');
const customerRoutes = require('./routes/CustomerRoute');
const UpdateData = require('./routes/UpdateRoute');
const CustomerKycData = require('./routes/CustomerKycRoute');
const DealerData = require('./routes/DealerRoute');
const VehicleData = require('./routes/VehicleRoute');
const TestLoans = require('./routes/TestloanRoute');
const LoanApplications = require('./routes/LoanApplicationRoute');
const FormData = require('form-data');
const DealerCustomers = require('./routes/DealerCustomerRoute');
const UpdatePhoto = require('./routes/UpdatePhotoRoute');
const loanData = require('./routes/CreateApplicationRoute');
const loanApplicationData = require('./routes/CreateLoanRoute');
const UpdatePanPhoto = require('./routes/UpdatePanPhotoRoute');
const UpdateAadharBack = require('./routes/UpdateAadharBackRoute')
const UpdateAadharPhoto = require('./routes/UpdateAadharPhotoRoute');
const createVehicle = require('./routes/CreatevehicleRoute');
const UpdateHouseImages = require('./routes/UpdateHouseImagesRoute');
const BrandProductData = require('./routes/BrandProductRoute');
const EmployeesData = require('./routes/EmployeesRoute');
const PNFCustomerData = require('./routes/PNFCustomerRoute');
const GPSData = require('./routes/GPSRoute');
const UpdateLoanData = require('./routes/UpdateLoanApplicationRoute')
const LoanHouseImagesData = require('./routes/UpdateLoanApplicationHouseImagesRoute')
const VendorData = require('./routes/VendorDataRoute')
//const DealerCustomers = require('./routes/DealerCustomerRoute')
var serviceAccount = require("./dealer-77fe8-firebase-adminsdk-x1y4o-a17271680b.json");
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
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection',
  (socket) => {
      console.log('New user connected');
      //emit message from server to user
      socket.emit('newMessage',
          {
              from: 'jen@mds',
              text: 'hepppp',
              createdAt: 123
          });

      // listen for message from user
      socket.on('createMessage',
          (newMessage) => {
              console.log('newMessage', newMessage);
          });

      // when server disconnects from user
      socket.on('disconnect',
          () => {
              console.log('disconnected from user');
          });
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
app.use('/updatedob', UpdateData);
app.use('/customers', DealerCustomers);
app.use("/updatePhoto", UpdatePhoto);
app.use('/createloan',loanApplicationData);
app.use('/updatepanphoto', UpdatePanPhoto);
app.use('/updateAadharphoto', UpdateAadharPhoto);
app.use('/updateAadharback',UpdateAadharBack);
app.use("/createvehicle", createVehicle);
app.use("/updatehouseimages", UpdateHouseImages);
app.use("/brandproducts", BrandProductData);
app.use("/Allcustomers", DealerCustomers);
app.use("/employees", EmployeesData);
app.use("/pnfcustomers", PNFCustomerData);
app.use("/getgps",GPSData);
app.use("/updateloanapplicationgps", UpdateLoanData);
app.use("/updateloanapplicationhouseimages", LoanHouseImagesData);
app.use("/vendor", VendorData )





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










app.post("/create", async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_CREATE_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = 38562544;
  
      const { 
                  numberOfTires, 
                  selectedBrand, 
                  loanAmount,
                  mobilenumber,
                  FullName, 
                  PanNumber, 
                  AlternateMobileNumber,
                  martialStatus,
                  numchildren,
                  houseType,
                  truckNumber,
                  source,
                  sourcerefid,
                  date,
                  NoOfTrucks,
                  driverSalary,
                  loanType,
                  monthlyEMIOutflow,
                  noofyearsinbusiness,
                  oldornew,
                  pancard,
                  aadharfront,
                  aadharback,
                  dob,
                  confpanNumber,
                  houseUrl,
                  houseImages,
                  selectedProduct,
                  rcimage,
                  
              } = req.body;
              console.log(req.body);
const dataField = {
  "201": { "value": FullName },
  "200": { "value": date },
  "215": { "value": loanAmount },
  "217": { "value": `{"reference_column_id":"${sourcerefid}","value":"${source}"}` },
  "216": { "value": numberOfTires },
  "202": { "value": PanNumber },
  "203": { "value": mobilenumber },
  "204": { "value": AlternateMobileNumber },
  "205": { "value": NoOfTrucks },
  "210": { "value": martialStatus },
  "211": { "value": numchildren },
  "212": { "value": houseType },
  "213": { "value": truckNumber },
  "839": { "value": selectedBrand },
  "234": { "value": confpanNumber },
  "214": { "value": driverSalary },
  "1412": { "value": loanType },
  "208": { "value": monthlyEMIOutflow },
  "206": { "value": noofyearsinbusiness },
  "243": { "value": oldornew },
  "1421": {"value": dob},
  "1431": {"value": houseUrl},
  "1453" : {"value": selectedProduct},
  
  

};

// Function to create the desired format for file data
const createFileData = (file) => ({
  name: file.name,
  uploaded_name: file.uploaded_name,
  path: file.path,
  size: file.size,
  status: file.status,
  filepath: file.uploaded_name,
  fullpath: file.path
});

// Add pancard data if available
if (pancard && pancard.length > 0) {
  const formattedPancardData = pancard.map(createFileData);
  dataField["1417"] = { "value": JSON.stringify(formattedPancardData) };
}
if (rcimage && rcimage.length > 0) {
  const formattedRcimageData = rcimage.map(createFileData);
  dataField["1454"] = { "value": JSON.stringify(formattedRcimageData) };
}

// Add aadharFront data if available
if (aadharfront && aadharfront.length > 0) {
  const formattedAadharFrontData = aadharfront.map(createFileData);
  dataField["1418"] = { "value": JSON.stringify(formattedAadharFrontData) };
}


// Add aadharBack data if available
if (aadharback && aadharback.length > 0) {
  const formattedAadharBackData = aadharback.map(createFileData);
  dataField["1419"] = { "value": JSON.stringify(formattedAadharBackData) };
}

if (houseImages && houseImages.length > 0) {
  const formattedHouseImageData = houseImages.map(createFileData);
  dataField["1432"] = { "value": JSON.stringify(formattedHouseImageData) };
}

//console.log(req.body);
  const data = JSON.stringify(dataField);
      
  
      const tyreData = await getTyreData(url, headers, sheetId, data);
      //console.log('TyreData:', tyreData);
  
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



  
  app.post('/login/validate-login', async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Email and password", email, password);
    try {
      const response = await axios.post(
        'https://pnf.tigersheet.com/login/validate-login',
        `email=${email}&password=${password}`,
        {
          headers: {
            'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
      );
      //console.log(response.messages);
      res.status(response.status).send(response.data);
    } catch (error) {
      // If there's an error with the external API, send an error response
      console.error('Error:', error.response.data);
      res.status(500).send('Internal Server Error');
    }
  });










  app.post('/gps', async(req, res) => {
   try{
    const url = process.env.TIGERSHEET_API_CREATE_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId  = 55003861
      const {latitude, longitude, timestamp, username,appState, day} = req.body;
      console.log(req.body);
      const dataField = {
        "1476": { "value": latitude },
        "1477": { "value": longitude },
        "1478":{"value": timestamp},
        "1482":{"value": username},
        //"1483": {"value": appState}
        "1484":{"value": day}
      }
      const data = JSON.stringify(dataField);
      
  
      const tyreData = await getTyreData(url, headers, sheetId, data);
      //console.log('TyreData:', tyreData);
  
      res.send({ data: tyreData });
   }catch(err){
    console.log("Error in Adding Data", err);
   }
  });



  


































  







app.post('/workflow', async (req, res) => {
  const source = req.body.loan_id;
  const name =  req.body.name;
  const mobilenumber =  req.body.mobilenumber;
  
  console.log("loanid is requires", source)
  console.log("name", name);
  console.log("mobile number", mobilenumber)
  
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
    const sourceMobileNumber = source;
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
  console.log(`Server is running on http://localhost:${Port}`);

});