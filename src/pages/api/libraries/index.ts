import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'micro-cors';

// this file handles requests to /api/libraries

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  return res.end(
    JSON.stringify({
      outputData: 47,
    })
  );
}

const cors = Cors({
  allowMethods: ['GET', 'HEAD'],
});

export default cors(handler);
