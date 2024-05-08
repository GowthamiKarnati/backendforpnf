const getTyreData = require('../contollers/CreatevehicleController');
const createVehicle = async (req, res) => {
    try {
      const url = process.env.TIGERSHEET_API_CREATE_URL;
      const headers = {
        'Authorization': process.env.TIGERSHEET_AUTHORIZATION_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      const sheetId = 32026511;
  
      const {truckNumber,rcNumber,rcPicture, name, namerefid, vehicleFiles} = req.body;
      console.log(req.body.vehicleFiles);
      const rcPictureData = rcPicture.map(file => ({
        "name": file.name,
        "uploaded_name": file.uploaded_name,
        "path": file.path,
        "size": file.size,
        "status": file.status,
        "filepath": file.uploaded_name,
        "fullpath": file.path
      }));
      const createFileData = (file) => ({
        name: file.name,
        uploaded_name: file.uploaded_name,
        path: file.path,
        size: file.size,
        status: file.status,
        filepath: file.uploaded_name,
        fullpath: file.path
      });
      const dataField = {
        "608": { "value": truckNumber },
        "1424": { "value": rcNumber },
        "1420": { "value": JSON.stringify(rcPictureData) },
        "609" : {"value":`{"reference_column_id":"${namerefid}","value":"${name}"}`},
        
          };
        if (vehicleFiles && vehicleFiles.length > 0) {
          const formattedVehicleImageData = vehicleFiles.map(createFileData);
          dataField["1437"] = { "value": JSON.stringify(formattedVehicleImageData) };
        }
          
    const data = JSON.stringify(dataField);
      console.log(data)
  
    const tyreData = await getTyreData(url, headers, sheetId, data);
    console.log('TyreData:', tyreData);

    res.send({ data: tyreData });
    //res.send({msg:'successs'});
    
  
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = createVehicle;