const https = require('https');

module.exports.handler = async (event) => {
    if(event && event.queryStringParameters && event.queryStringParameters.deviceName) {
        let theDevice = event.queryStringParameters.deviceName
            const cpeRawData = await extractCPEs(theDevice)
            let cpeList = cpeRawData
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: cpeList
                    },
                    null,
                    2
                ),
            };
        
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify(
                {
                    message: "Must provide a device name"
                },
                null,
                2
            ),
        };
    }
};

function getVulnerabilities(cpeList) {
    let rawVulsData = ''
    for(let i = 0; i < cpeList.length; i++) {
        let cpeName = cpeList[i]["cpeName"]
        rawVulsData = extractVulnerabilities(cpeName)
    }
    return rawVulsData
}

function extractVulnerabilities(cpeName) {
    return new Promise((resolve, reject) => {
        let vuls = ''
        const req = https.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10&cpeName=${cpeName}`, (resp) => {
            resp.on('data', (chunk) => {
                vuls += chunk
            });
            resp.on('end', () => {
                resolve(vuls)
            });
        })
        req.on('error', () => {
            reject(`Something error occured while querying vulnerability posts related to cpe ${searchWords}`);
        })
    })
}

function extractCPEs(searchWords) {
    return new Promise((resolve, reject) => {
        const req = https.get(`https://services.nvd.nist.gov/rest/json/cpes/2.0?resultsPerPage=10&keywordSearch=${searchWords}`, (resp) => {
        // A chunk of data has been received.
        let rawCpes = ''    
        resp.on('data', (chunk) => {
                rawCpes += chunk
            });
            resp.on('end', async () => {
                let cpes= JSON.parse(rawCpes).products
                let rawVulsData = ''
                for(let i = 0; i < cpes.length; i++) {
                    let cpeName = cpes[i]["cpe"]["cpeName"]
                    rawVulsData += await extractVulnerabilities(cpeName)
                }
                resolve(rawVulsData)
            })
        });    
        req.on('error', () => {
            reject(`Something error occured while querying cpes related to product ${searchWords}`);
        })
    })
}