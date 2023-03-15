# iot-vulnerabilities-fyi - Backend


The backend routes will be hosted on AWS Lambda. Only a single function will be used. And only path needed is.

`<domain>/app`

The backend structure here is To simplify our process and All requests are POST requests, `route` is a parameter included in each request body to specify the backend route.


## Available routes
---

#### get_all_products
Get all product names.

Request:

```json
{
  "route": "get_all_products"
}
```


Response:

```json
{
  "message": "OK",
  "data": ["Echo", "MacBook Pro"]
}
```

---


#### get_all_products_by_company

Get all product names by company.

Request

```json
{
  "route": "get_all_products_by_company",
  "company_name": "amazon"
}
```


Response:

```json
{
  "message": "OK",
  "data": ["Echo", "Kindle"]
}
```


---


#### get_product_by_id
Get product detail by id.

Request:

```json
{
  "route": "get_product_by_id",
  "id": "asfdsvsadfasdf&9hiajsdf"
}
```


Response:

```json
{
  "message": "OK",
  "data": {
      "company_name": "amazon",
      "product_name": "Echo",
      "vulnerabilities": [
        {
          "product_version": "V1.0",
          "vulnerability": ""
        },
        {
          "product_version": "V1.1",
          "vulnerability": ""
        }
      ]
    }
}
```

---



#### get_companies
Get company names.
Request:

```json
{
  "route": "get_companies",
}
```


Response:

```json
{
  "message": "OK",
  "data": ["amazon", "apple", "meta"]
}
```

---


#### create_vulnerability
Create a new vulnerability.
Request:

```json
{
  "route": "create_vulnerability",
  "company_name": "amazon",
  "product_name": "Echo",
  "product_version": "V1.0",
  "vulnerability": "",
}
```


Response:

```json
{
  "message": "OK",
}
```




---
