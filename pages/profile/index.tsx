import { Edit, useForm } from '@refinedev/antd'
import { Form, Input } from 'antd'
import { GetServerSideProps } from 'next'
import React from 'react'
import { supabaseClient } from 'src/config/supabaseClient'
import { supabase } from 'src/lib/supabase'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

interface ProfileProps {
    user: any
}

const Profile: React.FC<ProfileProps> = ({ user }) => {

    const { formProps, saveButtonProps } = useForm<any>({
        warnWhenUnsavedChanges: true
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

export const getServerSideProps: GetServerSideProps = async () => {

    const provider = supabase.dataProvider(supabaseClient);
    const { data } = await provider.getOne({
        resource: 'users',
        id: 1
    });

    return {
        props: {
            user: data
        }
    }
}