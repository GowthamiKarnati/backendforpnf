const getTyreData =  require('../contollers/CreateApplicationController')
const loanData = async (req, res) => {
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
                  cnfPanNumber,
                  driverSalary,
                  loanType,
                  monthlyEMIOutflow,
                  noofyearsinbusiness,
                  oldornew
              } = req.body;
      
  
  //   const dataField = {
  //     "201":{"value":"gowthami"},
  //     "200":{"value":"11/09/2001"},
  //     "215":{"value":"299999" },            
  //     //"217": {"value": `{"reference_column_id":"${sourcerefid}","value":"${source}"}`},
  //     "216":{"value":"3" },
  //     "202":{"value":"ABCTY1234D"},
  //     "203":{"value":"6304201304"},
  //     "204":{"value":"8743573653"},
  //     "205":{"value":"2"},
  //     "210":{"value":"married"},
  //     "211":{"value":"3"},
  //     "212":{"value":"owned"},
  //     "213":{"value":"8173462784"},
  //     "839":{"value":"GoodYear"},
  //     "234":{"value":"ABCTY1234D"},
  //     "214":{"value":"91827643"},
  //     // "1208":{"value":loanType},
  //     "208":{"value":"823648"},
  //     "206": {"value": "0"},
  
  // };
  const dataField = {
    "201":{"value":FullName},
    "200":{"value":date},
    "215":{"value":loanAmount },            
    "217": {"value": `{"reference_column_id":"${sourcerefid}","value":"${source}"}`},
    "216":{"value":numberOfTires },
    "202":{"value":PanNumber},
    "203":{"value":mobilenumber},
    "204":{"value":AlternateMobileNumber},
    "205":{"value":NoOfTrucks},
    "210":{"value":martialStatus},
    "211":{"value":numchildren},
    "212":{"value":houseType},
    "213":{"value":truckNumber},
    "839":{"value":selectedBrand},
    "234":{"value":cnfPanNumber},
    "214":{"value":driverSalary},
    "1412":{"value":loanType},
    "208":{"value":monthlyEMIOutflow},
    "206": {"value": noofyearsinbusiness},
    "243":{"value": oldornew},
    "234":{"value":PanNumber}

};

  const data = JSON.stringify(dataField);
      
  
      const tyreData = await getTyreData(url, headers, sheetId, data);
      console.log('TyreData:', tyreData);
  
      res.send({ data: tyreData });
  
    } catch (err) {
      console.error('Error in fetching data:', err.message);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = loanData;