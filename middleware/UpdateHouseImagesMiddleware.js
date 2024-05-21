const getUpdatePhoto = require('../contollers/UpdatePhotoController');
const UpdateHouseImages = async (req, res) => {
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
      const dataField ={};
      const createFileData = (file) => ({
        name: file.name,
        uploaded_name: file.uploaded_name,
        path: file.path,
        size: file.size,
        status: file.status,
        filepath: file.uploaded_name,
        fullpath: file.path
      });
      if (files && files.length > 0) {
        const formattedHouseImageData = files.map(createFileData);
        dataField["1459"] = { "value": JSON.stringify(formattedHouseImageData) };
      }
      const data = JSON.stringify(dataField);
      console.log(data);
      const PhotoData = await getUpdatePhoto(url, headers, sheetId, recordId, data);
      console.log('PhotoData:', PhotoData);
      res.send({ msg: "Files updated successfully" });
    } catch (err) {
      console.error('Error in updating photo:', err.message);
      res.status(500).send('Internal Server Error');
    }
  }
  module.exports = UpdateHouseImages;