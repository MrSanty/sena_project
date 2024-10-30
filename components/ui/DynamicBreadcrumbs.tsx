'use client'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { useBreadCrumb } from '@/hooks'

export const DynamicBreadcrumbs = () => {
  const pathnames = useBreadCrumb()

  return (
    <Breadcrumbs
      itemClasses={{
        item: 'text-zinc-600 data-[current]:text-zinc-900',
      }}
    >
      {pathnames.map((pathname, index) => {
        const href = index === 0 ? '/dashboard' : `${pathnames.slice(0, index + 1).join('/')}`
        const label = pathname.charAt(0).toUpperCase() + pathname.slice(1)

        return (
          <BreadcrumbItem
            key={index}
            href={href}
          >
            {label}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
