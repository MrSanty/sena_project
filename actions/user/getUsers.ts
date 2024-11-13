'use server';

import prisma from '@/lib/prisma';

export const getUsers = async (
  companyId: number, 
  search: string, 
  typeDoc?: string
) => {
  try {
    let where = {}

    if (!typeDoc) {
      where = {
        company_id: companyId
      }
    } else {
      where = {
        company_id: companyId,
        type_doc: typeDoc
      }
    }


    const users = await prisma.users.findMany({
      where: {
        AND: [
          where,
        ],
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
        ]
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
