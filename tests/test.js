// const { GoogleSpreadsheet } = require('google-spreadsheet');

// // spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1qM8hPrMSsX3MV5igGUCPTvqYpR5DuEDRYkDqkM5-E0Y');

// const testMethod = async () => {
//     await doc.useServiceAccountAuth(require('../excel-serect.json'));

//     await doc.loadInfo(); // loads document properties and worksheets
//     console.log(doc.title);

//     const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
//     console.log(sheet.title);
//     console.log(sheet.rowCount);
//     let rows = await sheet.getRows();
//     let data = rows.map(GoogleSpreadsheetRow => {
//         return {
//             id: GoogleSpreadsheetRow._rawData[0],
//             name: GoogleSpreadsheetRow._rawData[1],
//             description: GoogleSpreadsheetRow._rawData[2],
//             category: GoogleSpreadsheetRow._rawData[3],
//             images: GoogleSpreadsheetRow._rawData[4].split(','),
//             isAtHomePage: GoogleSpreadsheetRow._rawData[5] ? true : false
//         };
//     })
//     console.log(data);
// }

// const dataModel = {

// }

// testMethod();



const fetchSpreadSheet = require('../app/services/google-spreadsheet');

fetchSpreadSheet.fetchCategories().then(console.log);
