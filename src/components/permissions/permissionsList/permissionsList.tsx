import { List, TextField, useTable } from '@refinedev/antd'
import { useCreate } from '@refinedev/core';
import { Button, Form, Input, Space, Table } from 'antd'
import React from 'react'
import { IPermission } from 'src/interfaces/models';

interface AssignPermissionsProps {
    roleId: number
}

const AssignPermissions: React.FC<AssignPermissionsProps> = ({ roleId }) => {

    const { mutate } = useCreate();
    const { tableProps, searchFormProps } = useTable<IPermission>({
        resource: 'permissions',
        dataProviderName: 'supabase',
        syncWithLocation: false,
        onSearch: (values: any) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.title,
                }
            ];
        }
    });

    const assignPermission = (permissionId: number) => {
        mutate({
            resource: 'rolePermissions',
            dataProviderName: 'supabase',
            values: {
                roleId: roleId,
                permissionId: permissionId
            },
            invalidates: ['list', 'many']
        })
    }

    return (
        <List>
            <Form style={{ marginBottom: '10px' }} {...searchFormProps} layout="inline">
                <Form.Item name="title">
                    <Input placeholder="Search by Name" />
                </Form.Item>
                <Button
                    type='primary'
                    onClick={searchFormProps.form?.submit}>
                    Submit
                </Button>
            </Form>

            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column<any>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <Button
                                type='default'
                                size="small"
                                onClick={() => assignPermission(record.id)}>
                                Assign
                            </Button>
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}

export default AssignPermissions