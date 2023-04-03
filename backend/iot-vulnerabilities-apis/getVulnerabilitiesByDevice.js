const {mysql} = require("./configs.js")

module.exports.handler = async (event) => {
    if(event && event.queryStringParameters && event.queryStringParameters.device) {
        try {
            let deviceID = event.queryStringParameters.device
            vuls = await mysql.query("SELECT * FROM Vuls where deviceID = ?", [deviceID])
            await mysql.end();
        }  catch(err) {
            return {
                statusCode: 501,
                body: JSON.stringify(
                    {
                        message: err
                    },
                    null,
                    2
                )
            }
        } finally {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: vuls
                    },
                    null,
                    2
                ),
            };
        }
    } else {
        const NO_COMPANY_ERROR = "Must Provide a device name."
        return {
            statusCode: 400,
            body: JSON.stringify(
                {
                    message: NO_COMPANY_ERROR
                },
                null,
                2
            ),
        };
    }
}