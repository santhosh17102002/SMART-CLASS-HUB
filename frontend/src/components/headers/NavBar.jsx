import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import photoURL from '../../assets/home/nodp.jpg';
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from '../../utilities/providers/AuthProvider';
import Swal from 'sweetalert2';
import { useUser } from '../../hooks/useUser';

const navLinks = [
    { name: 'Home', route: "/" },
    { name: 'Instructors', route: "/instructors" },
    { name: 'Classes', route: "/classes" },
];

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00"
        }
    }
});

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { currentUser } = useUser();
    const [isFixed , setIsFixed] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut me!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(
                    Swal.fire({
                        title: "Logged Out!",
                        text: "You are logged out.",
                        icon: "success"
                    })
                ).catch((err) => {
                    Swal.fire('Error!', err.message, "error");
                });

                navigate('/');
            }
        });
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login')
    }, [location]);

    useEffect(() => {
        setScrollPosition(0);
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getNavBg = () => {
        if (isHome && scrollPosition <= 100) {
            return 'bg-transparent text-white';
        } else {
            return isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black';
        }
    };

    return (
        <motion.nav 
            className={`${getNavBg()} fixed top-0 w-full z-10 transition-colors duration-500 ease-in-out`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex items-center justify-between'>
                    <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
                        <div>
                            <h1 className='text-2xl font-Cinzel inline-flex gap-3 items-center'>
                                SmartClassHub <img src='/laptop-logo.png' className='w-8 h-8' />
                            </h1>
                            <p className='font-bold text-[13px] tracking-[8px]'>Learning Path</p>
                        </div>
                    </div>
                    <div className='md:hidden flex items-center'>
                        <button type="button" onClick={toggleMobileMenu} className='text-gray-300 hover:text-white focus:outline-none'>
                            <FaBars className='h-6 w-7 hover:text-primary' />
                        </button>
                    </div>
                    <div className='hidden md:block'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {
                                    navLinks.map((Link) => (
                                        <li key={Link.route}>
                                            <NavLink
                                                className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : ''} hover:text-secondary duration-300`}
                                                to={Link.route}
                                                style={{ whiteSpace: 'nowrap' }}
                                            >{Link.name}</NavLink>
                                        </li>
                                    ))
                                }
                                {user ? null : isLogin ? (
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : ''} hover:text-secondary duration-300`}
                                        >Register</NavLink>
                                    </li>) :
                                    <li>
                                        <NavLink to="/login" className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : ''} hover:text-secondary duration-300`}>
                                            Login
                                        </NavLink>
                                    </li>
                                }
                                {user && <li>
                                    <NavLink to="/dashboard" className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : ''} hover:text-secondary duration-300`}>Dashboard</NavLink>
                                </li>}
                                {user && <li>
                                    <img src={user?.photoURL || photoURL} alt="" className='h-[40px] w-[40px] rounded-full' />
                                </li>}
                                {user && <li>
                                    <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>Logout</NavLink>
                                </li>}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px]'>Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

export default NavBar;
