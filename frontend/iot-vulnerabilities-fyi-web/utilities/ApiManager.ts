

type fetchDataProps = {
  url: string;
  method: string;
};

export const fetchData = async (props: fetchDataProps) => {
  try {
    const response = await fetch('/api/apiManager', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: props.url,
        method: props.method,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const get_all_companies = async () => {
  const companies = await fetchData({
    url: 'https://frtrmzgviqdg7abtdsisa7dlry0oonap.lambda-url.us-east-1.on.aws/',
    method: 'GET',
  })
  return companies;
}

export const get_all_devices = async () => {
  const products = await fetchData({
    url: 'https://oi7b3td5vteg56lexi6o77bgmi0uyvjp.lambda-url.us-east-1.on.aws/',
    method: 'GET',
  })
  return products;
}

export const get_devices_by_company = async (id: number) => {
  const devices = await fetchData({
    url: `https://zq4adzusyc4nz23nlbsnrsdi5u0urvqe.lambda-url.us-east-1.on.aws?company=${id}`,
    method: 'GET',
  })
  return devices;
}

export const get_vulnerabilities_by_device = async (id: number) => {
  const vulnerabilities = await fetchData({
    url: `https://dtz3mk3eirbwmxaj7qtgaowxla0cmqfu.lambda-url.us-east-1.on.aws?device=${id}`,
    method: 'GET',
  })
  return vulnerabilities;
}