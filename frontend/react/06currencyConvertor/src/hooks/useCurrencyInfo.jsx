import { useEffect, useState } from "react";


// not working
// fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
// fetch(`https://v6.exchangerate-api.com/v6/bcb46308c42dfd53594c45d4/latest/${currency}`)

function UseCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {

        fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}`)
            .then(response => {
                response.json()
            })
            .then(response => setData(response.rates));
    }, [currency])

    // conversion_rates
    console.log(data);
    return data;
}

export default UseCurrencyInfo;