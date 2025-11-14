
import NavItem from './NavItem'

function Footer() {
  return (
    <div className='px-24 flex bg-primary-black-pearl text-white justify-between '>
      <div className='flex flex-col gap-4'>
        <>
          <img src="/logo-ic3-quiz-removebg-white.png" alt="Logoc IC3Quiz" className='h-[150px] w-[150px]' />
          <p className='flex text-[20px]'>
            <img src='/logo-ban-quyen.png' className='h-[30px] w-[30px]' />
            2025 IC3Quiz. All rights reserved
          </p>
        </>
        <p className='text-[18px]'>
          Email: phantanphuc282004@gmail.com
        </p>
        <p className='text-[18px]'>
          Numberphone: +84 564068652
        </p>
        <p className='text-[18px]'>
          Github: TanPhuc2004
        </p>
      </div>
      <div className='flex flex-col gap-4 text-[20px] mt-[50px]'>
        <NavItem label="Trang chủ" link='/' />
        <NavItem label="Bài kiểm tra IC3" link='/' />
        <NavItem label="Về chúng tôi" link='/about-us' />
        <NavItem label="Đăng nhập/ Đăng ký" link='/login' />
      </div>
    </div>
  )
}

export default Footer