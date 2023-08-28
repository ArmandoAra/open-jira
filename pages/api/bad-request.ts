// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean;
    message: string | string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    //Esperamos mediante el url un mensaje, si no viene entonces sera un bad request
    const { message = "Bad Request" } = req.query;


    res.status(400).json({
        ok: false,
        message
    })
}
