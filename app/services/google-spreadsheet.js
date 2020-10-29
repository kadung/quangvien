const { GoogleSpreadsheet } = require('google-spreadsheet');

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
            slug: string_to_slug(product[1]),
            description: product[2],
            categoryId: product[3],
            imagesCard: product[4],
            imagesDetail: product[5].split(','),
            isAtHomePage: product[6] ? true : false
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

const string_to_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ·/_,:;";
    var to   = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddeeeeeeeeeeeeeeeeeeeeeeiiiiiiiiiioooooooooooooooooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuuyyyyyyyyyy------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}