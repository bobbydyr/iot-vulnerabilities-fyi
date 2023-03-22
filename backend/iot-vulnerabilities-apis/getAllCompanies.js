const {mysql} = require("./configs.js")

module.exports.handler = async (event) => {
    try {
        companies = await mysql.query("SELECT * FROM Companies")
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
                    message: companies
                },
                null,
                2
            ),
        };
    }
  };
  