const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1qM8hPrMSsX3MV5igGUCPTvqYpR5DuEDRYkDqkM5-E0Y');

module.exports.fetchCategories = async () => {
    let data =  await fetchData("1813434113");
    return data.map(category => {
        return {
            id: category[0],
            name: category[1],
        }
    })
}

module.exports.fetchProducts = async () => {
    const data =  await fetchData("0");
    return data.map(product => {
        return {
            id: product[0],
            name: product[1],
            description: product[2],
            categoryId: product[3],
            imagesCard: product[4],
            imagesDetail: product[5].split(','),
            isAtHomePage: product[6] ? true : false
        };
    })
}

// Private
const fetchData = async (sheetId) => {
    await doc.useServiceAccountAuth(require('../../excel-serect.json'));
    await doc.loadInfo(); 
    
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();

    return rows.map(GoogleSpreadsheetRow => GoogleSpreadsheetRow._rawData);
}