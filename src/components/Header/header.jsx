import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <div className='w-100'>

        <div>
            <a className='curs' onClick={OpenSidebar}>
                <GiHamburgerMenu color='black' className='icon-hamburger m-3'/>
            </a>
            <a href='/dashboard'>
                {/* <img src={img} className='menu-icon' alt="" /> */}
            </a>
        </div>

      </div>

      <div className='w-100 color1'>
          {/* <img className='menu-icon' src={logo} alt="" /> */}
      </div>
    </header>
  )
}
