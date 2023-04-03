const {mysql} = require("./configs.js")

module.exports.handler = async (event) => {
    var devices = ''
    try {
        devices = await mysql.query("SELECT * FROM Devices")
        await mysql.end()
    } catch(err) {
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
                    message: devices
                },
                null,
                2
            ),
        };
    }
  };
  