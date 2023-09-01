"use client"
import { useLoadingState, useProgramState } from "@/stores"
import { Card, Skeleton } from "antd";

const ListPrograms: React.FC = () => {
  const { listPrograms } = useLoadingState();
  const { ids, dic } = useProgramState()

  if (listPrograms) {
    return (
      <Skeleton active />
    )
  }
  return (
    <>
      {ids.map(id => (
        <Card title={dic[id].name} key={id}></Card>
      ))}
    </>
  )
}

export default ListPrograms;