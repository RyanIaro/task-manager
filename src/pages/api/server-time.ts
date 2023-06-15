import { NextApiRequest, NextApiResponse } from 'next';

//Handling server time
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverTime = new Date().toISOString();

  res.status(200).json({ serverTime });
}
