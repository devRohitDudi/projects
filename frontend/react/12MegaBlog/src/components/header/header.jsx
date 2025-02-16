import React from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus = useSelector(state => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className='py-3 shadow bg-blue-900'>
            <Container>
                <nav className='flex h-9 items-center justify-center'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo className=' flex justify-center items-center' width='80px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto items-center'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name} className=' flex items-center'>
                                    <button className=' text-white text-[20px] font-bold inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black hover:cursor-pointer rounded-full '
                                        onClick={() => navigate(item.slug)} >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <LogoutBtn />
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header