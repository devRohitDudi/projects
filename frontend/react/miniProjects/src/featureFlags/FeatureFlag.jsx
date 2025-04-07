import { useContext } from 'react'
import offer from './components/offer'
import christmas from './components/christmas'
import ads from './components/ads'
import FeatureFlagsContext from './context.jsx'

function FeatureFlag() {

    const { loading, enabledFlags } = useContext(FeatureFlagsContext)

    const componentsToRender = [

        { key: "isChristmas", component: <christmas /> },
        { key: "isAdsApplied", component: <ads /> },
        { key: "isStudentOffer", component: <offer /> }
    ]

    function checkEnabledFlags(currentKey) {
        return enabledFlags[currentKey]
    };


    if (loading) return (<h1>Loading...</h1>)
    return (
        <div>
            {
                componentsToRender.map(componentItem => (
                    checkEnabledFlags(componentItem.key) ?
                        componentItem.component : null
                ))
            }
        </div>
    )
}

export default FeatureFlag