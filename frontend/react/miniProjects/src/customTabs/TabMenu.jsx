import { useState } from 'react'
import Tab from './Tab'

function TabMenu() {
    const [currentTab, setCurrentTab] = useState(0)

    // const values = [
    //     {
    //         name: "tab1",
    //         value: "this is the value for tab 1"
    //     },
    //     {
    //         name: "tab2",
    //         value: "This is the article number 2 after swtching the tab"
    //     },
    //     {
    //         name: "tab3",
    //         value: "Article number 3 after swtching the tab in parent component"
    //     }
    // ]

    const isActive = (number) => {
        return currentTab === number ? true : false
    }

    const classname = ` bg-amber-400 p-2`
    return (
        <>
            <div className='bg-gray-700 m-3 p-4 rounded-2xl '>
                <button className={`${classname} ${isActive(0) ? 'bg-green-400' : null}`} onClick={() => setCurrentTab(0)}>Tab 1</button>
                <button className={`${classname} ${isActive(1) ? 'bg-green-400' : null}`} onClick={() => setCurrentTab(1)}>Tab 2</button>
                <button className={`${classname} ${isActive(2) ? 'bg-green-400' : null}`} onClick={() => setCurrentTab(2)}>Tab 3</button>
            </div>
            {/* <Tab value={values[currentTab].value} /> */}


            {/* or we can just pass the number in props and 
            check in component and return specific like this */}
            <Tab value={currentTab} />

            <br />
            <p>There are two methods i written
                1: pass the values from props of active tab
                2: pass the tab number and decide what to return in tab component
            </p>
        </>

    )
}

export default TabMenu