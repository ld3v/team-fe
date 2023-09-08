"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  FormProps,
  Typography,
  notification,
  Alert,
} from "antd";
import { UserOutlined, LockOutlined, ProfileOutlined } from "@ant-design/icons";
import { login, register } from "@/actions";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { useAccountState, useLoadingState } from "@/stores";

const AuthForm: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  if (isLogin) {
    return (
      <>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>
        <div className="h-14" />
      </>
    );
  }
  const isDisableRegister = process.env.NODE_ENV === "production" &&
    !!localStorage.getItem("D3V_KEY") &&
    localStorage.getItem("D3V_KEY") !== process.env.NEXT_PUBLIC_DEV_KEY;

  return (
    <>
      {isDisableRegister && (
        <Alert
          message={
            "This feature is disabled because this app is in DEV mode only!"
          }
          className="tw-mb-5"
        />
      )}
      <Form.Item
        name="displayName"
        rules={[{ required: true, message: "Please enter your displayname" }]}
      >
        <Input
          placeholder="Name"
          prefix={<ProfileOutlined />}
          disabled={isDisableRegister}
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined />}
          disabled={isDisableRegister}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          disabled={isDisableRegister}
        />
      </Form.Item>
    </>
  );
};

const AuthPage = () => {
  const router = useRouter();
  const [isLoginForm, setFormType] = useState<boolean>(true);
  const { appStatus } = useLoadingState();
  const [isAuthenticating, setAuthenticating] = useState<boolean>(false);
  const { current } = useAccountState();
  const [form] = useForm();

  const handleDone = () => {
    setAuthenticating(() => false);
    router.push('/u');
  }

  const handleLogin: FormProps["onFinish"] = async ({ username, password }) => {
    setAuthenticating(() => true)
    await login(
      { username, password },
      {
        onSuccess: handleDone,
        onError: (msg) => notification.error({ message: msg }),
      }
    );
  };
  const handleRegister: FormProps["onFinish"] = async ({
    username,
    password,
    displayName,
  }) => {
    await register(
      { username, password, displayName },
      {
        onError: (message) => notification.error({ message }),
        onSuccess: handleDone,
      }
    );
  };

  useEffect(() => {
    if (current && !appStatus) {
      router.push("/u");
    }
  }, [appStatus]);

  return (
    <div className="tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center">
      <Card className="tw-shadow-md tw-w-[360px]">
        <Typography.Title level={3} className="!tw-font-bold">
          {isLoginForm ? "Login" : "Register"}
        </Typography.Title>
        <Form form={form} onFinish={isLoginForm ? handleLogin : handleRegister}>
          <AuthForm isLogin={isLoginForm} />
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={isAuthenticating || appStatus}
          >
            Submit
          </Button>
          <div className="tw-text-center tw-py-2">
            <span
              onClick={() => setFormType(!isLoginForm)}
              className="tw-italic tw-text-gray-500 tw-cursor-pointer"
            >
              {isLoginForm ? "Create a new one!" : "Existed? Login now!"}
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AuthPage;
