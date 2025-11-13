import React, { use, useEffect } from 'react'
import { getUserColumns } from './config/column_table';
import type { User } from '../../types';
import axios from 'axios';
import { Table } from 'antd';
import { showMessage } from '../../component/notification/Message';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { allUsers,changeStatusRedux } from '../../slice/userSlice';
type Props = {}

const User = (props: Props) => {
  const handleActivate = (idUser: User['_id']) => {
    const importUrl = import.meta.env.VITE_API_URL
    const changeStatus = () => {
      axios.post(`${importUrl}/users/change-status`, { userId: idUser }, { withCredentials: true })
        .then(response => {
          dispatch(changeStatusRedux({ userId: idUser ?? "", status:"active" }))
          showMessage(true, response.data.message || "Cập nhật trạng thái thành công");
        })
        .catch(error => {
          if (axios.isAxiosError(error)) {
            showMessage(error.response?.data.status, error.response?.data?.message || "Có lỗi xảy ra");
            console.error('There was an axios error!', error.response?.data);
          }
        });
    }
    changeStatus();
  }
  const columns = getUserColumns(handleActivate);
  const [user, setUser] = React.useState<User[]>([]);
  const users = useAppSelector(state => state.user.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUsers = () => {
      const importUrl = import.meta.env.VITE_API_URL
      axios.get(`${importUrl}/users/all`, { withCredentials: true })
        .then(response => {
          setUser(response.data.users);
          dispatch(allUsers(response.data.users))
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
    fetchUsers();
  }, []);


  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(record) => record._id || record.email || Math.random().toString()}
      pagination={{ pageSize: 10 }}
    />
  )
}
export default User