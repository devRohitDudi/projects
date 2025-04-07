const flags_api_Response = {
    isChristmas: false,
    isAdsApplied: true,
    isStudentOffer: true,
}

function featureFlagsService() {
    return new Promise((resolve, reject) => {
        if (flags_api_Response) setTimeout(resolve(flags_api_Response), 3000)
        else reject("some error occured! please try again later.")
    })
}

export default featureFlagsService