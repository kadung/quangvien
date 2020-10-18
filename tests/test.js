
const test = require('../app/services/mailjet');

const testMethod = async () => {
    let result = await test.sendEmail(123)
    console.log(result);
}

testMethod();