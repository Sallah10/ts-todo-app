import React from 'react'
import { TaskProps } from './Hero';

interface EditModalProps {
    task: TaskProps;
    onSave: (updatedTask: TaskProps) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onClose, onSave }) => {
    const [editTask, setEditTask] = React.useState(task);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditTask(prevTask => ({ ...prevTask, [name]: value }))
    }
    return (
        <div className="flex flex-col gap-2 fixed  lg:top-[65%] bg-[#313D5A] text-[#EAEAEA] p-6 rounded-md ">
            {/* modal */}
            <div className="flex flex-col gap-4 ">
                <div className='flex justify-between'>
                    <h2 >Edit Task</h2>
                    <h2 className='text-red-600 cursor-pointer' onClick={onClose}>X</h2>
                </div>
                <input
                    name="title"
                    value={editTask.title}
                    onChange={handleChange}
                    className="input bg-[#BEADD4] text-black placeholder-[#000000] px-6 rounded-sm "
                />
                <div className="flex gap-2">
                    <button onClick={() => onSave(editTask)} className='px-2 py-1 bg-green-400 text-md rounded-md'>Save</button>
                    <button onClick={onClose} className='px-2 py-1 bg-red-400 text-md rounded-md'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal