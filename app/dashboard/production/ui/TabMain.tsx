'use client'

import { Tab, Tabs } from "@nextui-org/react"
import { Process } from "../(process)/Process"
import { Products } from "../(products)/Products"
import { FC } from "react";

interface TabMainProps {
  company_id: number;
}

export const TabMain: FC<TabMainProps> = ({
  company_id
}) => {
  return (
    <Tabs>
      <Tab title="Procesos">
        <Process />
      </Tab>
      <Tab title="Productos">
        <Products company_id={company_id} />
      </Tab>
    </Tabs>
  )
}