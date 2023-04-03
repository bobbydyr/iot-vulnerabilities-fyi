# iot-vulnerabilities-fyi - Backend


The backend routes will be hosted on AWS Lambda.

The backend structure here is To simplify our process to retrieve IoT devices and vulnerabilities from AWS RDS, and all requests are GET requests.


## Available endpoints
---

### **get_all_companies** 

Get all IoT device vendors.

Endpoint: https://frtrmzgviqdg7abtdsisa7dlry0oonap.lambda-url.us-east-1.on.aws/ 

Request Method: GET

Response:

```json
{
    "message": [
        {
            "id": 25,
            "name": "Abbott Laboratories"
        },
        {
            "id": 17,
            "name": "Amazon"
        },
        {
            "id": 21,
            "name": "Apple"
        }
    ]
}
```

---


### **get_all_devices** 

Get all IoT devices.

Endpoint: https://oi7b3td5vteg56lexi6o77bgmi0uyvjp.lambda-url.us-east-1.on.aws/

Request Method: GET

Response:

```json
{
    "message": [
        {
            "id": 2,
            "deviceName": "Amazon Kindle",
            "imageUrl": null,
            "companyID": 17,
            "model_version": ""
        },
        {
            "id": 3,
            "deviceName": "Philips Hue",
            "imageUrl": null,
            "companyID": 20,
            "model_version": ""
        }
    ]
}
```


---

### **get_devices_by_company** 

Get all IoT devices belonging to the given vendor/company.

Endpoint: https://zq4adzusyc4nz23nlbsnrsdi5u0urvqe.lambda-url.us-east-1.on.aws?company={Company_ID}

Request Method: GET

Required parameter: company

Request: https://zq4adzusyc4nz23nlbsnrsdi5u0urvqe.lambda-url.us-east-1.on.aws?company=17


Response:

```json
{
    "message": [
        {
            "id": 2,
            "deviceName": "Amazon Kindle",
            "imageUrl": null,
            "companyID": 17,
            "model_version": ""
        },
        {
            "id": 4,
            "deviceName": "Amazon Echo",
            "imageUrl": null,
            "companyID": 17,
            "model_version": ""
        },
        {
            "id": 5,
            "deviceName": "Amazon Fire TV",
            "imageUrl": null,
            "companyID": 17,
            "model_version": ""
        }
    ]
}
```

---

### **get_vulnerabilities_by_device** 

Get vulnerabilities belonging to the given IoT Device.

Endpoint: https://dtz3mk3eirbwmxaj7qtgaowxla0cmqfu.lambda-url.us-east-1.on.aws?device={Device_ID}

Request Method: GET

Required parameter: device

Request: https://dtz3mk3eirbwmxaj7qtgaowxla0cmqfu.lambda-url.us-east-1.on.aws?device=2


Response:

```json
{
    "message": [
        {
            "id": 1,
            "deviceID": 2,
            "summary": "CVE-2012-4248 is a security vulnerability that affects the Apache Struts web framework. The vulnerability is caused by a flaw in the way that Struts handles user input, which can allow an attacker to execute arbitrary code on the affected system.\n\nThe vulnerability was first discovered in August 2012 and was assigned CVE-2012-4248. It affects all versions of Apache Struts prior to version 2.3.1.1.\n\nThe vulnerability is caused by a lack of input validation in the Struts framework. This means that an attacker can submit specially crafted input to a Struts application, which can cause the application to execute arbitrary code.\n\nTo exploit the vulnerability, an attacker would need to submit a specially crafted HTTP request to the Struts application. This request would need to contain a malicious payload that would be executed by the application.\n\nThe vulnerability was patched in Apache Struts version 2.3.1.1, which was released in August 2012. Users of Apache Struts are advised to upgrade to this version or later to protect themselves from this vulnerability.\n\nOverall, CVE-2012-4248 is a serious security vulnerability that can allow an attacker to take control of a system running a vulnerable version of Apache Struts. It underscores the importance of keeping software up-to-date and implementing strong input validation in web applications.",
            "cveID": "CVE-2012-4248"
        }
    ]
}
```