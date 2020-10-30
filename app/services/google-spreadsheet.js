const { GoogleSpreadsheet } = require('google-spreadsheet');
const { stringToSlug } = require('../utils/string-to-slug');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1qM8hPrMSsX3MV5igGUCPTvqYpR5DuEDRYkDqkM5-E0Y');

exports.fetchCategories = async () => {
    let data = await fetchData("1813434113");
    return data.map(category => {
        return {
            id: category[0],
            name: category[1],
        }
    })
}

exports.fetchProducts = async () => {
    const data =  await fetchData("0");
    return data.map(product => {
        return {
            id: product[0],
            name: product[1],
            description: product[2],
            categoryId: product[3],
            imagesCard: product[4],
            imagesDetail: product[5].split(','),
            isAtHomePage: product[6] ? true : false,
            slug: stringToSlug(product[1])
        };
    })
}

module.exports.saveData = async (phoneNumber, product) => {
    await doc.useServiceAccountAuth(require('../../excel-serect.json'));
    await doc.loadInfo(); 
    
    const sheet = doc.sheetsById[293271437];
    const result = await sheet.addRow({ Phone: phoneNumber, Product: product, Date: new Date().toDateString() });

    return result._rawData;
}

// Private
const fetchData = async (sheetId) => {
    await doc.useServiceAccountAuth(require('../../excel-serect.json'));
    await doc.loadInfo(); 
    
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();

    return rows.map(GoogleSpreadsheetRow => GoogleSpreadsheetRow._rawData);
}

