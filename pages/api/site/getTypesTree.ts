// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import typesData from '../../../data/types/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        res.status(200).json(typesData)
    } catch (err) {
        res.status(400).json({ status: false, message: err })
    }
}
