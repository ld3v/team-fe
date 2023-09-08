import { deleteTool } from "@/actions/tools";
import { TAppIntegrated } from "@/common/interfaces";
import {
  toolStates,
  useLoadingState,
  useToolsState,
} from "@/stores";
import { DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Table, TableProps, Tooltip, notification } from "antd";
import { useMemo } from "react";

interface IToolsTable { }

export const ToolsTable: React.FC<IToolsTable> = () => {
  const { ids, dic } = useToolsState();
  const { listTools } = useLoadingState();
  const data = useMemo(() => toolStates.byIds(ids, dic), [ids]);

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteTool(id, {
      onError: (message) => notification.error({ message }),
      onSuccess: (isSuccess) =>
        isSuccess
          ? notification.success({ message: "Deleted an app successfully!" })
          : notification.error({ message: "Delete an app failed!" }),
    });
  };

  const columns: TableProps<TAppIntegrated>["columns"] = [
    {
      title: "Name",
      fixed: "left",
      width: 200,
      dataIndex: "name",
      render: (v, { description }) =>
        description ? <Tooltip title={description}>{v}</Tooltip> : v,
    },
    { title: "App", dataIndex: "app", width: 100 },
    {
      title: "Actions",
      dataIndex: "id",
      align: "center",
      fixed: "right",
      width: 140,
      render: (id) => (
        <div className="tw-flex tw-items-center tw-justify-center">
          <LockOutlined disabled className="tw-mr-5" />
          <DeleteOutlined onClick={() => handleDelete(id)} />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      tableLayout="fixed"
      loading={listTools}
      pagination={false}
    />
  );
};
