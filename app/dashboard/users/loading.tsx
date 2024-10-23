'use client'


import { Skeleton } from "@nextui-org/react"

const loading = () => {
  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuarios</h2>
          <Skeleton className="flex rounded-sm w-12 h-12 sm:hidden"/>
        </div>
        <div className="flex justify-end items-center mb-3">
          <Skeleton className="rounded-md h-8 w-[6.5%] hidden sm:flex"/>
        </div>
        <div className="overflow-x-auto rounded-md">
          {/* 
            table skeleton
          */}
          <Skeleton className="w-full h-80"/>
        </div>
      </div>
    </>
  )
}
export default loading