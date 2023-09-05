"use client"
import { useEffect } from "react";
import { getProgram } from "@/actions/program";
import { TWrapperComponent } from "@/common/interfaces/component"

const ProgramPagesLayout: React.FC<TWrapperComponent & { params: { id: string } }> = ({ children, params: { id } }) => {
  const fetchProgram = async () => {
    return await getProgram(id);
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  return (
    <div>
      {children}
    </div>
  )
}

export default ProgramPagesLayout;