import React from 'react'


//method for if the value is coming from prop
// function Tab({ value }) {
//     return (
//         <div className='flex flex-col '>
//             <h1 className='text-xl'>{value}</h1>
//         </div>
//     )
// }

// if we to decide here



const values = [
    {
        name: "tab1",
        value: "this is the value for tab 1"
    },
    {
        name: "tab2",
        value: "This is the article number 2 after swtching the tab"
    },
    {
        name: "tab3",
        value: "Article number 3 after swtching the tab in parent component"
    }
]
function Tab({ value }) {
    if (value === 0) {
        return <>
            <h1 className=' text-blue-800 text-xl'>{values[0].value} </h1>
        </>
    }
    if (value === 1) {
        return <>
            <h1 className=' text-blue-800 text-xl'>{values[1].value} </h1>
        </>
    }
    if (value === 2) {
        return <>
            <h1 className='text-blue-800  text-xl'>{values[2].value} </h1>
        </>
    }
}

export default Tab