const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1qM8hPrMSsX3MV5igGUCPTvqYpR5DuEDRYkDqkM5-E0Y');

module.exports = async () => {
    await doc.useServiceAccountAuth(require('../../excel-serect.json'));
    await doc.loadInfo(); 
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return rows.map(GoogleSpreadsheetRow => GoogleSpreadsheetRow._rawData);
}