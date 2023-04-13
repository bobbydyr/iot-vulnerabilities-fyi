import type { NextApiRequest, NextApiResponse } from 'next';

type RequestData = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
};

async function fetchWrapper(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers?: Record<string, string>,
  data?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData };
}

export default async function apiManager(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { url, method, headers, data } = req.body as RequestData;

    try {
      const response = await fetchWrapper(url, method, headers, data);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Only POST method is allowed' });
  }
}
