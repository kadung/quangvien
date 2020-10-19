const mailjet = require('../app/services/mailjet');
const spreadsheet = require('../app/services/google-spreadsheet');

const testMethod = async () => {
    let result = await spreadsheet.saveData(123456, "Ốc 1");
    console.log(result);
}

testMethod();