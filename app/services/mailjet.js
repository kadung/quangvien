require('dotenv').config();

const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

exports.sendCallbackEmail = async (phoneNumber) => {
    try {
        let result = await mailjet.post("send", {'version': 'v3.1'})
            .request({
                "Messages":[{
                    "From": {
                        "Email": "davekieu@gmail.com"
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

exports.sendContactEmail = async (data) => {
    const {name, phone, email, message} = data;
    try {
        let result = await mailjet.post("send", {'version': 'v3.1'})
            .request({
                "Messages":[{
                    "From": {
                        "Email": "davekieu@gmail.com"
                    },
                    "To": [{
                        "Email": "davekieu@gmail.com"
                    }],
                    "Subject": "Có khách liên hệ",
                    "HTMLPart": `
                        <h1>Thông tin khách hàng </h1>
                        <ul>
                            <li>Tên khách hàng: ${name} </li>
                            <li>Số điện thoại: ${phone} </li>
                            <li>Email: ${email} </li>
                            <li>Nội dung liên hệ: ${message} </li>
                        </ul>
                    `
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

