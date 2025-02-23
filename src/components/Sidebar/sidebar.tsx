import { Box, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import './style.scss'

import DashboardIcon from '../../assets/icons/dashboard.svg'
import PeopleIcon from '../../assets/icons/people.svg'
import SearchIcon from '../../assets/icons/search.svg'
import ChartIcon from '../../assets/icons/chart.svg'



const Sidebar = () => {
    return (
        <Box width="100%" >
            <Flex justify="end" alignItems="center" p="0" className='SidebarItem'>
                <NavLink to="/" className={
                    ({ isActive }) => isActive ? 'SideBarItemTextActive SidebarItemText' : 'SidebarItemText'
                }>داشبورد</NavLink>
                <img src={DashboardIcon} alt='dashboardIcon' />
            </Flex>
            <Flex justify="end" alignItems="center" p="0" className='SidebarItem'>
                <NavLink to="/users" className={
                    ({ isActive }) => isActive ? 'SideBarItemTextActive SidebarItemText' : 'SidebarItemText'
                }>مدیریت کاربران</NavLink>
                <img src={PeopleIcon} alt='dashboardIcon' />
            </Flex>
            <Flex justify="end" alignItems="center" p="0" className='SidebarItem'>
                <NavLink to="/search" className={
                    ({ isActive }) => isActive ? 'SideBarItemTextActive SidebarItemText' : 'SidebarItemText'
                }>جست و جو</NavLink>
                <img src={SearchIcon} alt='dashboardIcon' />
            </Flex>
            <Flex justify="end" alignItems="center" p="0" className='SidebarItem'>
                <NavLink to="/analyze" className={
                    ({ isActive }) => isActive ? 'SideBarItemTextActive SidebarItemText' : 'SidebarItemText'
                }>تحلیل تماس</NavLink>
                <img src={ChartIcon} alt='dashboardIcon' />
            </Flex>
        </Box>
    );
}

export default Sidebar;
