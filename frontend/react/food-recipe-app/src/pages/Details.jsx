import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

function Details() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { recipeDetailsData, handleAddToFavorite, favoriteList, setRecipeDetailsData } = useContext(GlobalContext)
    const { id } = useParams()
    // const favoritesList = useContext(state => state.favoriteList)
    console.log("favoritesList from import:", favoriteList);

    useEffect(() => {
        const getRecipeDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
                const data = await response.json()
                setRecipeDetailsData(data.recipe)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }
        getRecipeDetails()
    }, [id, setRecipeDetailsData])



    return (

        <div className=' min-h-screen mt-10 mx-auto py-10 flex flex-col gap-7'>
            {
                loading ? <h1>Loading...</h1> : null
            }
            {
                error ? <h1>Error occured! {error}</h1> : null
            }
            <div className='row-start-2 lg:row-start-auto '>
                <div className='h-96 overflow-hidden rounded-xl group'>
                    <img className='w-full h-full object-cover group-hover:scale-105 duration-300'
                        src={recipeDetailsData?.image_url} alt={recipeDetailsData?.title} />
                </div>
            </div>

            <div className="flex justify-between gap-3">
                <div>
                    <span className="text-xl z-5 text-cyan-600 font-medium">
                        {recipeDetailsData?.publisher}
                    </span>
                    <h3 className="font-bold text-2xl truncate text-white">
                        {recipeDetailsData?.title}
                    </h3>
                </div>
                <div>
                    <button
                        onClick={() => handleAddToFavorite(recipeDetailsData)}
                        className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider hover:cursor-pointer mt-3 inline-block shadow-md bg-black text-white"
                    >
                        {
                            Array.isArray(favoriteList) && favoriteList.some(item => item.recipe_id == recipeDetailsData?.recipe_id) ?
                                "Remove from favorites" :
                                "Add to favorites"
                            // buttonText
                        }
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <span className="text-2xl font-semibold text-white">
                    Ingredients:
                </span>
                <ul className="flex bg-slate-800 p-4 rounded-2xl flex-col gap-3">
                    {recipeDetailsData?.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <p className="text-xl font-semibold ">
                                {ingredient}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Details