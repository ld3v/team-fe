import { IDrawer } from "@/common/interfaces"
import { Button, Drawer, Form, Input, Modal } from "antd"

interface IFormFooter {
  onSubmit: () => void;
  onReset?: () => void;
}
const FormFooter: React.FC<IFormFooter> = ({ onSubmit, onReset }) => {
  return (
    <div className="tw-flex tw-items-center">
      <Button onClick={onSubmit}>Submit</Button>
      {onReset ? <Button onClick={onReset}>Reset</Button> : null}
    </div>
  )
}

export const DrawerCreateProject: React.FC<IDrawer> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    if (form.isFieldsTouched()) {
      Modal.confirm({ title: 'Are you want to close?', content: 'All data you inputted will lost.', onCancel: () => { form.resetFields(); onClose() } })
    }
  }
  return (
    <Drawer open={open} onClose={onClose} title="Add a new program" footer={<FormFooter onSubmit={form.submit} />}>
      <Form form={form}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please enter the program\'s name' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" rows={3} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}