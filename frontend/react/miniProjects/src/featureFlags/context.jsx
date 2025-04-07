import { createContext, useEffect, useState } from "react"

import featureFlagsService from './data'

export const FeatureFlagsContext = createContext(null)

function FeatureFlagsState({ children }) {

    const [loading, setLoading] = useState(false)
    const [enabledFlags, setEnabledFlags] = useState({})


    const FetchFlags = async () => {
        try {
            setLoading(true)
            const response = await featureFlagsService();
            setEnabledFlags(response)
            setLoading(false)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        FetchFlags()
    }, [])

    return (
        <FeatureFlagsContext.Provider value={{ loading, enabledFlags }}>
            {children}
        </FeatureFlagsContext.Provider >
    );
}

export default FeatureFlagsState