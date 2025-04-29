import React from 'react'
import SideBar from './SideBar'
import Card from './Card';
import Updates from './Updates';
import EditModal from './EditModal';
import { saveTasks, loadTasks } from '../utils/strorage';
export type TaskProps = {
    id: number;
    title: string;
    completed: boolean;
    stared?: boolean;
    // currentFilter: 'all' | 'starred' | 'pending';
    // onFilterChange: (filter: 'all' | 'starred' | 'pending') => void;
    // handleCheck?: React.MouseEventHandler<HTMLInputElement>;
}

type filterType = 'all' | 'pending' | 'completed' | 'starred';

const Hero: React.FC = () => {
    // const [tasks, setTasks] = React.useState<TaskProps[]>([{ id: 1, title: "First Task", completed: false }]);
    const [tasks, setTasks] = React.useState<TaskProps[]>(() => loadTasks());
    const [taskName, setTaskName] = React.useState("")
    const [editingTask, setEditingTask] = React.useState<TaskProps | null>(null);
    const [activeId, setActiveId] = React.useState<number | null>(null);
    const [filter, setFilter] = React.useState<filterType>('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        if (filter === 'starred') return task.stared;
        return false;
    });

    const setAndSaveTasks = (newTasks: TaskProps[]) => {
        setTasks(newTasks);
        saveTasks(newTasks);
    }

    const clearAllTasks = (e: React.FormEvent) => {
        if (loadTasks.length > 0 && window.confirm('Are you sure you want to delete all tasks?')) {
            e.preventDefault();
            setAndSaveTasks([]);
        }
        else {
            new window.Comment('No Task to delete')
        }
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        setAndSaveTasks([
            ...tasks,
            {
                id: Date.now(), // Better than length+1 for unique IDs
                title: taskName,
                completed: false
            }
        ]);
        setTaskName('');
    }

    const starredTask = (taskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => task.id === taskId ?
                { ...task, stared: !task.stared }
                : task))
    }

    const completeToggle = (taskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => task.id === taskId ?
                { ...task, completed: !task.completed }
                : task))
    }

    const taskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }

    const handleActive = (taskId: number) => {
        setActiveId(activeId === taskId ? null : taskId)
    }

    const handleDelete = (taskId: number) => {
        setTasks(prevTask => (prevTask.filter(task => task.id != taskId)))
    }

    const handleEdit = (task: TaskProps) => {
        setEditingTask(task);
    };

    const handleUpdate = (updatedTask: TaskProps) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setEditingTask(null);
    };

    return (
        <>
            <div className='bg-[#CBC5EA] w-full h-full flex flex-col gap-3 items-center py-8 relative '>
                <SideBar tasks={tasks} currentFilter={filter} onFilterChange={setFilter} />
                <h1 className="text-[#313D5A] text-2xl font-semibold">Today</h1>

                <form action="" className="flex flex-col md:flex-row gap-4 justify-center">
                    <input type="text" placeholder="e.g Buy groceries" value={taskName} onChange={taskChange} className="input bg-[#BEADD4] text-black placeholder-[#000000] px-6 rounded-sm lg:w-[350px]" />
                    <div className='flex gap-2'>
                        <button className="bg-[#73628A] text-white rounded-md text-[.9em] w-[100px] px-2 py-2 hover:text-[#313D5A]" onClick={addTask}>Add Task</button>
                        <button className=" bg-[#73628A] text-white rounded-md text-[.9em] w-[100px] px-2 py-2 hover:text-[#313D5A]" onClick={clearAllTasks}>Clear All</button>
                    </div>
                </form>
            </div>
            <div className="pt-10 flex flex-col-reverse md:flex-row gap-10 justify-center items-center md:items-start">
                {editingTask && (
                    <EditModal
                        task={editingTask}
                        onSave={handleUpdate}
                        onClose={() => setEditingTask(null)}
                    />
                )}
                <Updates task={tasks} />
                <div className='flex flex-col gap-4'>
                    {filteredTasks.map(task => (
                        <Card
                            key={task.id}
                            task={task}
                            taskCompleted={task.completed}
                            isActive={activeId === task.id}
                            onCardClick={() => handleActive(task.id)}
                            onToggle={completeToggle}
                            onStarred={() => starredTask(task.id)}
                            onDelete={() => handleDelete(task.id)}
                            onEdit={() => handleEdit(task)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Hero