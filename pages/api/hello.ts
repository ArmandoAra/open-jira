// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string;
  message: string;
  method: string;
  secret?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(process.env.SECRET_KEY)


  res.status(200).json({
    name: 'John Doe',
    message: 'Hello from API',
    method: req.method || 'No method',
    secret: process.env.SECRET_KEY
  })
}
