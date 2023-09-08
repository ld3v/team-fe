import { createTool } from "@/actions/tools";
import { IModal, IToolCreateReq, IToolCreateResult } from "@/common/interfaces";
import { useLoadingState, useToolsState } from "@/stores";
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  Typography,
  notification,
} from "antd";
import { useState } from "react";

export const ModalCreateTool: React.FC<IModal> = ({ open, onClose, onReloadData }) => {
  const [createResult, setCreateResult] = useState<IToolCreateResult | null>(
    null
  );
  const [form] = Form.useForm();
  const { options } = useToolsState();
  const { createTool: isCreating } = useLoadingState();

  const handleClose = () => {
    form.resetFields();
    setCreateResult(null);
    onClose();
  }

  const handleCreate: FormProps<IToolCreateReq>["onFinish"] = async (data) => {
    await createTool(data, {
      onError: (message) => notification.error({ message }),
      onSuccess: (res) => {
        setCreateResult(res);
        onReloadData?.();
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Create a new API key"
      footer={
        createResult ? (
          <Button type="default" onClick={handleClose}>
            Done
          </Button>
        ) : (
          <Button type="default" onClick={form.submit} loading={isCreating}>
            Save
          </Button>
        )
      }
    >
      <Form form={form} onFinish={handleCreate} disabled={!!createResult}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your API name" }]}
        >
          <Input placeholder="API name" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea rows={3} autoSize placeholder="Purpose?" />
        </Form.Item>
        <Form.Item
          name="app"
          rules={[{ required: true, message: "Please select an internal app" }]}
        >
          <Select
            options={options.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        </Form.Item>
      </Form>
      {createResult && (
        <>
          <Divider />
          <div className="tw-mb-5">
            Below is your <b>App ID</b> & <b>API Key</b>, send it along with the
            API to use. Please save it before closing this window as you
            can&#39;t see it later!
          </div>
          <Typography.Title level={5} className="tw-font-bold">
            App ID
          </Typography.Title>
          <Typography.Text
            className="tw-p-2 tw-rounded tw-bg-gray-100 tw-mb-5"
            copyable
          >
            {createResult.id}
          </Typography.Text>

          <Typography.Title level={5} className="tw-font-bold">
            API Key
          </Typography.Title>
          <Typography.Paragraph
            className="tw-p-2 tw-rounded tw-bg-gray-100"
            copyable
          >
            {createResult.APIKey}
          </Typography.Paragraph>
        </>
      )}
    </Modal>
  );
};
