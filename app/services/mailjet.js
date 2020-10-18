require('dotenv').config();

const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

module.exports.sendEmail = async (phoneNumber) => {
    try {
        let result = await mailjet.post("send", {'version': 'v3.1'})
            .request({
                "Messages":[{
                    "From": {
                        "Email": "davekieu@gmail.com",
                        "Name": "Mailjet Pilot"
                    },
                    "To": [{
                        "Email": "davekieu@gmail.com"
                    }],
                    "Subject": "Có khách hàng mới",
                    "HTMLPart": "<h1>Khách hàng có sdt <b>" + phoneNumber + "</b> cần tư vấn thêm </h1>"
                }]
            })

        return {
            status: result.body.Messages[0].Status,
            statusCode: result.response.res.statusCode
        }
    }
    catch(err){
        return {
            status: "Server error",
            statusCode: 500
        }
    }
}

