import React from 'react'
import { Link } from 'react-router-dom'
function RecipeItem({ item }) {
    return (
        <div key={item.recipe_id} className='hover:cursor-pointer w-80 flex flex-col overflow-hidden bg-white/75 shadow-xl p-5 gap-5 rounded-lg'>
            <div className='max-h-40 flex flex-col justify-center items-center  overflow-hidden' >
                <img className='block w-full' src={item.image_url} alt={item.title} />
            </div>
            <div>
                <h2 className='text-cyan-700 text-sm font-medium'>{item.publisher}</h2>
                <h1 className='font-bold text-[25px] truncate text-black'>{item.title}</h1>

                <Link to={`/recipe-item/${item.recipe_id}`}
                    className='hover:cursor-pointer text-sm p-3 px-8 rounded-xl font-medium 
                tracking-wider inline-block shadow-md bg-black text-white mt-3'>Check recipe Details</Link>

            </div>
        </div>
    )
}

export default RecipeItem