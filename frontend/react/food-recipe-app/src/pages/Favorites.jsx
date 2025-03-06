import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import RecipeItem from '../components/RecipeItem';

function Favorites() {
    const { loading, error, favoriteList } = useContext(GlobalContext)

    return (
        <div className='p-8 m-4 mt-13 container mx-auto  text-black flex flex-wrap justify-center gap-10'>
            {
                loading ? <h1>Loading...</h1> : null
            }
            {
                error ? <h1>Couldn't find recipe with that name! Please search valid names.</h1> : null
            }
            {
                favoriteList && favoriteList.map((recipe) => (
                    <RecipeItem item={recipe} />
                ))
            }
        </div>
    )
}

export default Favorites