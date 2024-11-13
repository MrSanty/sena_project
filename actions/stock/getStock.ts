'use server'

import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const getStock = async (
  companyId: number,
  search: string,
  page: number = 1,
  pageSize: number = 5
) => {
  try {
    // Define los filtros comunes
    const filters: Prisma.stockFindManyArgs = {
      where: {
        company_id: companyId,
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            code: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    }

    // Calcular el total de registros que cumplen los filtros
    const total = await prisma.stock.count({
      where: filters.where,
    })

    // Obtener los resultados paginados
    const stock = await prisma.stock.findMany({
      ...filters,
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    // Retornar el resultado paginado y el total
    return {
      total,
      stock
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
