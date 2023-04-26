// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import categoriesData from 'data/categories/categories';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        res.status(200).json(categoriesData)
    } catch (err) {
        res.status(400).json({ status: false, message: err })
    }
}
