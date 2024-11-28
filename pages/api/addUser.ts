import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, nome } = req.body;

    console.log('Received request to add user:', { username, nome });

    try {
      const newUser = await prisma.utenti.create({
        data: {
          username,
          nome,
        },
      });
      console.log('User added successfully:', newUser);
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      const err = error as Error;
      res.status(500).json({ error: 'Error adding user', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}