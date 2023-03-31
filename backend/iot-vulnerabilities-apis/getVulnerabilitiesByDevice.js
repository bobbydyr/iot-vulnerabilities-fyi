const https = require('https');
const { resolve } = require('path');

module.exports.handler = async (event) => {
    if(event && event.queryStringParameters && event.queryStringParameters.deviceName) {
        let theDevice = event.queryStringParameters.deviceName
            const cpeRawData = await extractCPEs(theDevice)
            let cpeUrlList = parseCPEIntoUrls(cpeRawData)
            const vuls = await Promise.all(cpeUrlList.map((url => extractVulnerabilities(url))))
            let parsedVuls = parseVuls(vuls, cpeUrlList)
            // try {
            //     for(let i = 0; i < vuls.length; i++) {
            //         let theVul = JSON.parse(vuls[i])
            //                 parsedVuls.push(theVul)
            //     }
            // } catch(err) {

            // }
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: parsedVuls
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
function parseCPEIntoUrls(cpeRawData) {
    let urls = cpeRawData.map((rawCPE) => {
        return `https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10&cpeName=${rawCPE["cpe"]["cpeName"]}`
    })
    return urls
}

function parseVuls(vuls, urls) {
    let parsedVuls = []
    try {
        for(let i = 0; i < vuls.length; i++) {
            let theVul = JSON.parse(vuls[i])
            if(theVul["resultsPerPage"] > 0) {
                parsedVuls.push({cpe:urls[i], vuls: theVul["vulnerabilities"]})
                // parsedVuls.push(theVul["vulnerabilities"])
            }
        }
    } catch(err) {

    }
    return parsedVuls
}

function extractVulnerabilities(url) {
    
    return new Promise((resolve, reject) => {
        const req = https.get(url, (resp) => {
            let res = ''
            resp.on('data', (chunk) => {
                res += chunk
            })
            resp.on('end', () => {
                resolve(res)
            })
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
            resp.on('end', () => {
                let cpes= JSON.parse(rawCpes).products
                resolve(cpes)
            })
        });    
        req.on('error', () => {
            reject(`Something error occured while querying cpes related to product ${searchWords}`);
        })
    })
}