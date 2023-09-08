import { useState } from "react";
import { Header } from "..";
import { ModalCreateTool } from "./create-modal";

interface IToolsHeader {
  onLoadData: () => void;
}

export const ToolsHeader: React.FC<IToolsHeader> = ({ onLoadData }) => {
  const [isModalCreateOpening, setModalCreateOpen] = useState<boolean>(false);

  return (
    <>
      <Header onAddClick={() => setModalCreateOpen(true)} />

      <ModalCreateTool
        open={isModalCreateOpening}
        onClose={() => setModalCreateOpen(false)}
        onReloadData={onLoadData}
      />
    </>
  );
};
