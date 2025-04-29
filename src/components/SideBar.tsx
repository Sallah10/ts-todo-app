import { useState } from 'react'
import menu from '../assets/menu.svg'
import close from '../assets/close-menu.png'
import { TaskProps } from './Hero'

interface SideBarProps {
    tasks: TaskProps[]
    currentFilter: 'all' | 'pending' | 'completed' | 'starred';
    onFilterChange: (filter: 'all' | 'pending' | 'completed' | 'starred') => void;
}

const SideBar: React.FC<SideBarProps> = ({ tasks, onFilterChange }) => {

    const completedCount = tasks.filter(t => t.completed).length
    const remainingCount = tasks.length - completedCount;
    const starred = tasks.filter(tasks => tasks.stared).length

    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className='flex self-start ml-6'>
                <img src={menu} alt="Menu" onClick={toggleMenu} className='flex flex-start' />
                {
                    isOpen && (
                        <div className='flex flex-col gap-4 bg-[#313D5A] text-[#EAEAEA]  w-[200px] h-screen fixed z-100 top-0 left-0 p-4'>
                            <h1 className='text-2xl font-bold'>ToDo List</h1>
                            <img src={close} alt="Close Menu" onClick={toggleMenu} className='w-[30px] h-[30px]' />
                            <h1 onClick={() => {
                                onFilterChange('all');
                                toggleMenu();
                            }} className='hover:text-[#BEADD4] cursor-pointer '>
                                Home
                            </h1>
                            <h3>{completedCount}/{tasks.length} tasks done</h3>
                            <h1 onClick={() => {
                                onFilterChange('completed');
                                toggleMenu();
                            }} className='hover:text-[#BEADD4] cursor-pointer'>
                                Completed Tasks
                            </h1>
                            <h1 onClick={() => {
                                onFilterChange('pending');
                                toggleMenu();
                            }} className='hover:text-[#BEADD4] cursor-pointer '>
                                Pending Tasks : {remainingCount}
                            </h1>
                            <h1 onClick={() => {
                                onFilterChange('starred');
                                toggleMenu();
                            }} className='hover:text-[#BEADD4] cursor-pointer '>
                                Starred Tasks: {starred}
                            </h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default SideBar