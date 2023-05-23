import { Edit, useForm } from '@refinedev/antd'
import { Form, Input } from 'antd'
import React from 'react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

interface ProfileProps {
    user: any
}

const Profile: React.FC<ProfileProps> = () => {

    const { formProps, saveButtonProps } = useForm<any>({
        warnWhenUnsavedChanges: true,
        id: 1
    });

    return (
        <SessionAuth>
            <Edit
                mutationMode='undoable'
                title='Update Your Profile'
                saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Edit>
        </SessionAuth>
    )
}

export default Profile;

// export const getServerSideProps: GetServerSideProps = async () => {

//     const provider = supabase.dataProvider(supabaseClient);
//     let data = null;

//     try {
//         data = await provider.getOne({
//             resource: 'users',
//             id: 1
//         });
//     } catch (error) {
//         console.log('error is ', error)
//     }

//     return {
//         props: {
//             user: data
//         }
//     }
// }