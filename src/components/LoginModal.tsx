import { useState } from "react";
import { Alert, Button, Form, Input, Modal } from "antd";
import { supabaseClient } from "../service/supabase";
type ON_SUBMIT = {
  email: string;
  password: string;
};

type LOGIN_MODAL = {
  isModalOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isModalOpen = false, onClose }: LOGIN_MODAL) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onFinish = ({ email, password }: ON_SUBMIT) => {
    supabaseClient.auth
      .signIn({ email, password })
      .then((data) => {
        setLoading(false);
        if (!data.error && data.user) {
          onClose();
        } else if (data.error) {
          setError(data.error.message);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  return (
    <Modal
      title="Login"
      visible={isModalOpen}
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered
    >
      <Form
        layout="vertical"
        initialValues={{ email: "", password: "" }}
        wrapperCol={{ style: { textAlign: "center" } }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onFocus={() => setError("")} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onFocus={() => setError("")} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
        {error && <Alert message={error} type="error" />}
      </Form>
    </Modal>
  );
};

export default LoginModal;
