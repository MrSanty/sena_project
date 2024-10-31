'use server';

import prisma from '@/lib/prisma';

export const getUsers = async (companyId: number, search: string) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        company_id: companyId,
        OR: [
          {
            first_name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            last_name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            num_doc: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ],
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });

    return users;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
