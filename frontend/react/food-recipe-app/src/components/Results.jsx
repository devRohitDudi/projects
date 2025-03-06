import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'
import RecipeItem from './RecipeItem'
function Results() {

    const { loading, error, recipeList } = useContext(GlobalContext)

    return (
        <div className='p-8 m-4 mt-13 container mx-auto  text-white flex flex-wrap justify-center gap-10'>
            {
                loading ? <h1>Loading...</h1> : null
            }
            {
                error ? <h1>Couldn't find recipe with that name! Please search valid names.</h1> : null
            }
            {
                recipeList && recipeList.map((recipe) => (
                    <RecipeItem item={recipe} />
                ))
            }
        </div>
    )
}

export default Results