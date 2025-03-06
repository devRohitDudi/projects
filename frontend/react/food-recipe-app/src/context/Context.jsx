import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const GlobalContext = createContext()

export default function GlobalState({ children }) {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useState('')
    const [error, setError] = useState(null)
    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoriteList, setFavoriteList] = useState([])

    const searchRecipe = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=` + searchParams)
            const data = await response.json()
            setRecipeList(data.recipes)
            console.log("data:", data);
            data.error ? setError(data.error) : setError(null)
            setLoading(false)
        }
        catch (error) {
            setError(error)
            setSearchParams('')
            setLoading(false)
        }
    }

    function handleAddToFavorite(currentItem) {
        setFavoriteList(prevList =>
            prevList.some(item => item.recipe_id === currentItem.recipe_id)
                ? prevList.filter(item => item.recipe_id !== currentItem.recipe_id)
                : [...prevList, currentItem]
        );

    }

    console.log('favorite list is: ', favoriteList);


    return <GlobalContext.Provider value={{ recipeList, handleAddToFavorite, favoriteList, recipeDetailsData, setRecipeDetailsData, loading, searchParams, setSearchParams, searchRecipe, error }}>{children} </GlobalContext.Provider>
}