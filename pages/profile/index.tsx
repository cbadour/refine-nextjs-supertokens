import { Edit, useForm, useSelect } from '@refinedev/antd'
import { Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

const Profile: React.FC<any> = () => {
    // useEffect(() => {
    //     fetch('/api/userInfo')
    //         .then(res => res.json())
    //         .then(userInfo => {
    //             console.log('userInfo', userInfo);
    //         });
    // }, []);

    const { formProps, saveButtonProps, queryResult } = useForm<any>({
        warnWhenUnsavedChanges: true
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<any>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <SessionAuth>
            <Edit
                mutationMode='undoable'
                title='Update Your Profile'
                canDelete
                saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name={["category", "id"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Select {...categorySelectProps} />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Select
                            options={[
                                {
                                    label: "Published",
                                    value: "published",
                                },
                                {
                                    label: "Draft",
                                    value: "draft",
                                },
                                {
                                    label: "Rejected",
                                    value: "rejected",
                                }
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Edit>
        </SessionAuth>
    )
}

export default Profile;