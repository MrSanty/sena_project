'use client'

import { usePathname } from "next/navigation";

export const useBreadCrumb = () => {
  const pathname = usePathname()
  const breadcrumbs = pathname.split("/").filter(Boolean)

  return breadcrumbs;
}