import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import path from 'path'

import { prisma } from '../../lib/db'

const uploadDestination = path.join(
  process.cwd(),
  'public',
  'shared-locations',
  'logos'
)
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDestination,
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname)
      const fileName = `${nanoid(10)}${fileExtension}`
      req.body.logo = fileName
      cb(null, fileName)
    },
  }),
})
const uploadMiddleware = upload.array('files')

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(uploadMiddleware)
  .get(async (req, res) => {
    res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' })
    const sharedLocations = await prisma.sharedLocation.findMany()
    res.end(JSON.stringify(sharedLocations))
  })
  .post(async (req, res) => {
    const { name, logo, type, longitude, latitude } = req.body
    await prisma.sharedLocation.create({
      data: {
        name,
        logo,
        type,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      },
    })
    res.writeHead(StatusCodes.CREATED)
    res.end('Successfully shared location')
  })

export const config = {
  api: {
    bodyParser: false,
  },
}
export default handler
