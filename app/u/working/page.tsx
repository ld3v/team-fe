"use client"
import { useEffect } from 'react';
import { getPrograms } from "@/actions/program";
import { ListPrograms, WorkingHeader } from '@/components/program';

const ProgramsPage = () => {
  const fetchData = async () => {
    await getPrograms();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <WorkingHeader />
      <ListPrograms />
    </div>
  )
}

export default ProgramsPage;