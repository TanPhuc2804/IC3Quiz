import { DashboardOutlined, ProductOutlined } from "@ant-design/icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function getItem(label:string, key:string, icon:any, children?:any) {
    return {
        key,
        icon,
        children,
        label,
    }
}


export const items = [
    getItem("Người dùng", "user", <DashboardOutlined />),
    getItem("Bộ đề thi", "exam", <ProductOutlined />),
    getItem("Bộ câu hỏi", "question", <ProductOutlined />),

]

export const itemUser = [
    getItem("Tài khoản", "account", <FontAwesomeIcon icon={faUser} />)
]