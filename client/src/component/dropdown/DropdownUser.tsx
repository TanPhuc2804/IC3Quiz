import  { useState } from 'react';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import ModalPackage from '../modal/ModalPackage';


type Props = {
    content: string
}

const DropdownUser = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            label: 'Gói gia hạn',
            onClick: () => {
                setIsModalOpen(true);
            }
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
        <>
            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space size="middle" className='text-white cursor-pointer'>
                        {props.content}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <ModalPackage
                isModalOpen={isModalOpen}
                handleOk={() => { }}
                handleCancel={() => { setIsModalOpen(false); }}
            >
            </ModalPackage>
        </>

    );
}

export default DropdownUser;