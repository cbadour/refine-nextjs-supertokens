import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Upload } from "antd";
import { IRole } from "src/interfaces/models";

const UsersCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IRole>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name={["phoneNumber"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name={["address"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Profile Image Path">
                    <Form.Item
                        name="profileImagePath"
                        getValueProps={(value) => {
                            return {
                                fileList: [{ url: value, name: value, uid: value }],
                            }
                        }}
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Upload.Dragger
                            listType="picture"
                            beforeUpload={() => false}>
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};

export default UsersCreate;
