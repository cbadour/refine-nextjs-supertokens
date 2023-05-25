import { List, TextField, useTable } from '@refinedev/antd'
import { useCreate } from '@refinedev/core';
import { Button, Form, Input, Space, Table } from 'antd'
import React from 'react'
import { IRole, IUserRoles } from 'src/interfaces/models';

interface AssignRolesProps {
    userId: number,
    userRoles: IUserRoles[]
}

const AssignRoles: React.FC<AssignRolesProps> = ({ userId, userRoles }) => {

    const { mutate } = useCreate();
    const { tableProps, searchFormProps } = useTable<IRole>({
        resource: 'roles',
        syncWithLocation: false,
        onSearch: (values: any) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.title
                }
            ];
        }
    });

    const assignRoles = (roleId: number) => {
        mutate({
            resource: 'userRoles',
            values: {
                roleId: roleId,
                userId: userId
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
                            {
                                userRoles.find(ur => ur.roleId === record.id) ?
                                    null
                                    :
                                    <Button
                                        type='default'
                                        size="small"
                                        onClick={() => assignRoles(record.id)}>
                                        Assign
                                    </Button>
                            }
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}

export default AssignRoles;