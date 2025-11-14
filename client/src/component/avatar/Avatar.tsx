
import { Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'


type AvatarProp ={
    size?:number
}
function AvatarUser({size}:AvatarProp) {

  return (
    <Avatar size={size ?? 120} icon={<FontAwesomeIcon icon={faUser}/>}/>
  )
}

export default AvatarUser