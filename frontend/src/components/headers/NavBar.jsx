import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import photoURL from '../../assets/home/girl.jpg'
import {FaBars} from "react-icons/fa"
import {motion} from "framer-motion"

const navLinks = [
    {name : 'Home',route : "/"},
    {name : 'Instructors',route : "/instructors"},
    {name : 'Classes',route : "/classes"},
]

const theme = createTheme({
    palatte : {
        primary:{
            main: "#ff0000",
        },
        secondary:{
            main:"#00ff00"
        }
    }
});



const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin,setIsLogin] = useState(false);
    const [isHome,setIsHome] = useState(false); 
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
    const [scrollPosition,setScrollPosition] = useState(0);
    const [isFixed , setIsFixed] = useState(false);
    const [isDarkMode,setIsDarkMode] = useState(false);
    const [navBg,setNavBg] = useState('bg-[#15151580]')
    const user = true;

    const toggleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLogout =()=>{
        console.log("logout")
    }

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(()=>{
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login')
    },[location])

    useEffect(()=>{
        const handleScroll = ()=>{
            const currentPostion = window.pageYOffset;
            setScrollPosition(currentPostion);
        };
        window.addEventListener('scroll',handleScroll);
        return () =>window.removeEventListener('scroll',handleScroll);
    },[])

    useEffect(() => {
        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:bg-black dark:text-white text-black');
            }
            else {
                setNavBg('bg-white dark:bg-black dark:text-white text-black');
            }
        } else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'} dark:text-white text-white`);

        }
    }, [scrollPosition]);

  return (
    <motion.nav 
   className={`${isHome ? navBg : 'bg-white dark:bg-black backdrop-blur-2xl'}  ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out  w-full z-10`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
        <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
            <div className='px-4 py-4 flex  items-center justify-between'>
                {/*logo */}
                <div onClick={()=>navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
                <div>
                    
                <h1 className='text-2xl font-Cinzel inline-flex gap-3 items-center '>SmartClassHub <img src='/laptop-logo.png' className='w-8 h-8'/></h1>
                    <p className='font-bold text-[13px] tracking-[8px] '>Learning Path</p>
                </div>
                </div>
                {/*mobile menu icons */}
                <div className='md:hidden flex items-center'>
                    <button type="button" onClick={toggleMobileMenu} className='text-grey-300 hover:text-white focus:outline-none'>
                        <FaBars className='h-6 w-7 hover:text-primary'/>
                    </button>
                </div>


                {/*navigational links */}
                <div className='hidden md:block text-black dark:text-white'>
                    <div className='flex'>
                        <ul className='ml-10 flex items-center space-x-4 pr-4'>
                            {
                                navLinks.map((Link)=>(
                                    <li key={Link.route} >
                                        <NavLink to ={Link.route} style={{whiteSpace:'nowrap'}} className={({ isActive }) => `font-bold 
                                        ${isActive ? ' text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300n`}>{Link.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                            {/*Based on users */}
                            {user? null : isLogin ? (
                                <li>
                                    <NavLink 
                                        to="/register" 
                                        className={({ isActive }) =>
                                         `font-bold ${
                                            isActive ? ' text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300n`}>Register
                                    </NavLink>
                                </li> ): 
                                <li>
                                    <NavLink to="/login" className={({ isActive }) => `font-bold ${isActive ? ' text-secondary' : `${navBg.includes('bg-transparent') ? 'text-black' : 'text-white dark:text-white'}`} hover:text-secondary duration-300n`}>
                                    Login
                                    </NavLink>
                                </li> 
                            }
                           
                            {
                                user && <li>
                                    <NavLink to="/dashboard" className={({ isActive }) =>
                                         `font-bold ${
                                            isActive ? ' text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300n`}>Dashboard</NavLink>
                                </li>
                            }
                            {
                                user&& <li>
                                    <img src={photoURL} alt="" className='h-[40px] w-[40px] rounded-full'/>
                                </li>
                            }

                            {
                                user && <li>
                                    <NavLink onClick = {handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>Logout</NavLink>
                                </li>
                            }
                           {/*color toggle */}
                           <li>
                            <ThemeProvider theme = {theme}>
                                <div className='flex flex-col justify-center items-center'>
                                    <Switch onChange ={()=> setIsDarkMode(!isDarkMode)}/>
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
  )
}

export default NavBar
