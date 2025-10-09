import React from 'react';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useAuth } from '../../contexts/AuthContext';


type Props = {
    content: string
}

const DropdownUser = (props: Props) => {

    const { logout } = useAuth();
    const items: MenuProps['items'] = [

        {
            key: '1',
            label: 'My Account',
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Các bài kiểm tra',
        },
        {
            key: '3',
            label: 'Thời hạn',
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: () => {
                logout();
                window.location.reload();
            }
        },

    ];

    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space size="middle" className='text-white cursor-pointer'>
                    {props.content}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
}

export default DropdownUser;