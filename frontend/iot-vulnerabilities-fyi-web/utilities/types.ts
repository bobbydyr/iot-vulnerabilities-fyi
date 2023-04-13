export type Company = {
  name: string;
  id: number;
}


export type Product = {
  id: number;
  deviceName: string;
  imageUrl: string;
  companyID: number;
  model_version: string;
}

export type Vulnerability = {
  id: number;
  deviceID: number;
  summary: string;
  cveID: string;
}
