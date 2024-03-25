const getUpdatePhoto = require('../contollers/UpdatePhotoController');
const UpdatePanPhoto = async (req, res) => {
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
          "1090": {
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
  }
  module.exports = UpdatePanPhoto;