import { TaskProps } from "../components/Hero";

export const loadTasks = (): TaskProps[] => {
    try{
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }
    catch(error) {
        console.error('Task Failed to load', error);
        return []
    }
}

export const saveTasks = (tasks : TaskProps[]) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks', error);
    }
}