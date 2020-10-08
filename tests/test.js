const { GoogleSpreadsheet } = require('google-spreadsheet');
const fetchSpreadSheetProducts = require('../app/services/fetch-spreadsheet-products');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1qM8hPrMSsX3MV5igGUCPTvqYpR5DuEDRYkDqkM5-E0Y');

const testMethod = async () => {
    await doc.useServiceAccountAuth(require('../excel-serect.json'));

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);
    let rows = await sheet.getRows();
    let data = rows.map(GoogleSpreadsheetRow => GoogleSpreadsheetRow._rawData)
    console.log(data);
}

testMethod();


