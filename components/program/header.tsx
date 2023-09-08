import { Breadcrumb, Button } from "antd"
import React, { useState } from "react";
import { DrawerCreateProject } from "./create-drawer";
import { Header } from "..";

interface IWorkingHeader { }
export const WorkingHeader: React.FC<IWorkingHeader> = () => {
  const [isModalCreateOpening, setModalCreateOpen] = useState<boolean>(false);

  return (
    <>
      <Header onAddClick={() => setModalCreateOpen(true)} />

      <DrawerCreateProject open={isModalCreateOpening} onClose={() => setModalCreateOpen(false)} />
    </>
  )
}
