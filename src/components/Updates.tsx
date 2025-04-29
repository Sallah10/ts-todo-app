import { TaskProps } from "./Hero"

const Updates: React.FC<{ task: TaskProps[] }> = ({ task }) => {
    const completedCount = task.filter(task => task.completed).length;
    const remainingCount = task.length - completedCount;
    return (
        <>
            <div className="flex flex-col gap-4 h-full w-[250px]">
                <div className="rounded-md bg-[#313D5A] text-[#EAEAEA] flex pl-4 gap-2">
                    <h2 className="py-2 ">Remaining</h2>
                    <p className="bg-[#BEADD4] px-3 pt-2 rounded-br-md rounded-tr-md w-[27px] ml-auto">{remainingCount}</p>
                </div>
                <div className="rounded-md bg-[#313D5A] text-[#EAEAEA] flex pl-4 gap-2">
                    <h2 className="py-2">Completed</h2>
                    <p className="bg-[#BEADD4] px-3 pt-2 rounded-br-md rounded-tr-md w-[27px] ml-auto">{completedCount}</p>
                </div>
                <div className="rounded-md bg-[#313D5A] text-[#EAEAEA] flex pl-4 gap-2">
                    <h2 className="py-2 ">Total Tasks</h2>
                    <p className="bg-[#BEADD4] px-3 pt-2 rounded-br-md rounded-tr-md w-[27px] ml-auto">{task.length}</p>
                </div>
            </div>
        </>
    )
}

export default Updates