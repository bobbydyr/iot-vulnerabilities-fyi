const {mysql} = require("./configs.js")

module.exports.handler = async (event) => {
    if(event && event.queryStringParameters && event.queryStringParameters.company) {
        try {
            let theCompanyID = event.queryStringParameters.company
            deviceNames = await mysql.query("SELECT * FROM DeviceNames where companyID = ?", [theCompanyID])
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
                        message: deviceNames
                    },
                    null,
                    2
                ),
            };
        }
    } else {
        const NO_COMPANY_ERROR = "Must Provide a company name."
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

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: event
            },
            null,
            2
        ),
    };
}