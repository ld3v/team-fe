"use client"
import { useEffect } from 'react';
import { getPrograms } from "@/actions/program";
import { useProgramState } from '@/stores';
import ListPrograms from '@/components/program/list';

const ProgramsPage = () => {
  const fetchData = async () => {
    await getPrograms();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <ListPrograms />
    </div>
  )
}

export default ProgramsPage;