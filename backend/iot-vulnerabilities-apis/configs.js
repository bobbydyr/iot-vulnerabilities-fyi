const mysql = require('serverless-mysql')({
    config: {
      host:"vulnerabilities.coxrqmffvkdm.us-east-2.rds.amazonaws.com",
      port:3306,
      database:"vulnerabilities",
      user:"admin",
      password:"vulnerabilitiesfyi"
    }
})

module.exports = { mysql }