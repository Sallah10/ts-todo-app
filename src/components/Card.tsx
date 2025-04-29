import React from 'react';
import edit from '../assets/edit.png'
import star from '../assets/Star.svg'
import { TaskProps } from './Hero';

export interface TaskCardProps {
    task: TaskProps;
    onToggle: (id: number) => void;
    isActive: boolean;
    onCardClick: () => void;
    taskCompleted: boolean;
    onStarred: () => void;
    onDelete: () => void;
    onEdit: () => void;
}



const Card: React.FC<TaskCardProps> = ({ task, isActive, onCardClick, onToggle, onStarred, onDelete, onEdit }) => {
    return (
        <>
            <div className='flex flex-col gap-4'>
                {/* rounded-lg w-[280px] lg:w-[360px] px-6 py-7 bg-[#AD96CD] flex justify-between */}
                <div
                    key={task.id}
                    className={` rounded-lg w-[280px] lg:w-[360px] px-6 py-7  flex justify-between transition-colors duration-200 cursor-pointer ${isActive ? 'bg-[#AD96CD]' : 'bg-[#CBC5EA] hover:bg-[#9D86BD]'}`}
                    onClick={onCardClick}>
                    <div className='flex items-center gap-4'>
                        <input type="checkbox"
                            defaultChecked={task.completed}
                            checked={task.completed}
                            className="checkbox checkbox-md rounded-4xl border-[#29262D]"
                            onChange={() => onToggle(task.id)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <h2 className='text-[#29262D] font-italic'>{task.title}</h2>
                    </div>
                    <div className='flex gap-1 items-center justify-center'>
                        <button onClick={onEdit}>
                            <img src={edit} alt="edit" />
                        </button>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            onStarred();
                        }}>
                            <img src={star} alt="star" className={` 'transparent border-0 cursor-pointer ' ${task.stared ? 'bg-[#313D5A] w-fit rounded-[50%] p-2' : ''}`} />
                        </button>
                        <button className='mt-1 ml-1 p-0 flex items-center justify-center text-black self-center' onClick={onDelete}>X</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
{/* <div className="bg-[#CBC5EA] rounded-lg w-[360px] px-6 py-7 hover:bg-[#AD96CD] flex justify-between">
                    <div className='flex items-center gap-4'>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-md rounded-4xl  bg-[#73628A] " />
                        <h2 className='text-[#29262D] font-italic'>Do the dishes</h2>
                    </div>
                    <img src={edit} alt="edit" />
                </div>
                <div className="bg-[#CBC5EA] rounded-lg w-[360px] px-6 py-7 hover:bg-[#AD96CD] flex justify-between">
                    <div className='flex items-center gap-4'>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-md rounded-4xl border-[#29262D]" />
                        <h2 className='text-[#29262D] font-italic'>Do the dishes</h2>
                    </div>
                    <img src={edit} alt="edit" />
                </div> */}