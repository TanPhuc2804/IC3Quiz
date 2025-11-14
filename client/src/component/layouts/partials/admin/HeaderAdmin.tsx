import { Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { faUser } from '@fortawesome/free-regular-svg-icons'

function HeaderAdmin() {
    const navigate = useNavigate()
    const handleLogout = () => {
      
    }
    const handleNavigate = () => {
        navigate("account")
    }
    return (
        <div
            className='flex justify-between items-center m-auto w-auto px-6'
        >
            <Typography.Title level={2} className='my-4'>IC3 Quiz</Typography.Title>
            <div className='flex items-center justify-between w-[150px] mr-[20px] hover:cursor-pointer'>
                <FontAwesomeIcon icon={faBell} size='lg' className='w-[20px] h-[20px] hover:cursor-pointer' />
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faUser} className='w-[20px] h-[20px] hover:cursor-pointer' onClick={handleNavigate} />
                    </div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-[20px] h-[20px] hover:cursor-pointer' onClick={handleLogout} />
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin