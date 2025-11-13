import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router';
import { items, itemUser } from './config';
import HeaderAdmin from '../../component/layouts/partials/admin/HeaderAdmin';
const { Header, Content, Footer, Sider } = Layout

type Props = {}
const AdminPage = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentKey = location.pathname.split("/").pop();
  const breadcrumbItems = findBreadcrumbPath(items, currentKey) || findBreadcrumbPath(itemUser, currentKey) || [];
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleClickMenu = (key:any) => {
    navigate(key)
  }

  function findBreadcrumbPath(items:any, targetKey:any, path:any[] = []) :any {
    for (const item of items) {
      const newPath = [...path, item];
      if (item.key === targetKey) return newPath;
      if (item.children) {
        const childPath = findBreadcrumbPath(item.children, targetKey, newPath);
        if (childPath) return childPath;
      }
    }
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ width: '1200px' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Typography.Title level={3} style={{ color: 'white', textAlign: 'center', marginTop: 16 }}>
          Quản trị viên
        </Typography.Title>
        <Menu
          theme='dark'
          defaultOpenKeys={['revenue']}
          selectedKeys={[currentKey ?? ""]}
          mode='inline'
          items={items}
          onClick={(e) => handleClickMenu(e.key)}
        />
        <hr className='w-[170px] my-[10px] mx-[auto] text-[white]' />
        <Menu
          theme='dark'
          selectedKeys={[currentKey ?? ""]}
          mode='inline'
          items={itemUser}
          onClick={(e) => handleClickMenu(e.key)}
        />
      </Sider>
      <Layout >
        <Header style={{
          padding: 0,
          background: colorBgContainer,
        }}>
          <HeaderAdmin />
        </Header>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}

          >
            <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
            {breadcrumbItems.map((item: { key: string; label: React.ReactNode }) => (
              <Breadcrumb.Item key={item.key} onClick={() => handleClickMenu(item.key)}>{item.label}</Breadcrumb.Item>
            ))}

          </Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default AdminPage