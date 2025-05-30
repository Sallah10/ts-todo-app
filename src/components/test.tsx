import { useState, useEffect, useRef } from 'react'


const Test = () => {
    const clickRef = useRef(0);
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const changeCountRef = useRef(0); // Track changes without re-renders

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        // setTheme(!theme);
        changeCountRef.current += 1;
    }

    const HandleClickP = () => {
        setCount(c => c + 1)
        clickRef.current += 1;
    }

    const HandleClickN = () => {
        setCount(c => c - 1)
        clickRef.current += 1;
    }

    const reset = () => {
        setCount(0)
        setHistory([])
        setTheme('light')
        changeCountRef.current = 0;
        clickRef.current = 0;
    }

    useEffect(() => {
        setHistory(h => [...h, count]);
    }, [count]); // Runs when `count` changes

    // function WindowResize() {
    //     const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    //     useEffect(() => {
    //         const handleResize = () => {
    //             setSize({ width: window.innerWidth, height: window.innerHeight })
    //         }
    //         window.addEventListener('resize', handleResize)
    //         return () => window.removeEventListener('resize', handleResize)
    //     }, [])

    //     return size;
    // }

    // WindowResize();

    return (
        <>
            <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'light' ? 'bg-blue-300 text-black' : 'bg-gray-900 text-white'}`}>
                <h1>Current Theme: {theme}</h1>
                <p>Theme changed {changeCountRef.current} times</p>
                <button onClick={toggleTheme}>Change Theme</button>
                <h1>Count : {count}</h1>
                <h1>History : {history.join(',')}</h1>
                <h1>Click: {clickRef.current}</h1>
                <button onClick={HandleClickP}>+</button>
                <button onClick={HandleClickN}>-</button>
                <button onClick={reset}>Reset</button>
            </div>
        </>
    )
}

export default Test