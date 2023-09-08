"use client"
import { getTools } from "@/actions/tools";
import { ToolsHeader, ToolsTable } from "@/components/tool";
import { useEffect } from "react";

const WorkingToolsPage = () => {
  const fetchData = async () => {
    await getTools();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <ToolsHeader onLoadData={fetchData} />
      <ToolsTable />
    </>
  )
}

export default WorkingToolsPage;