import express from 'express';

const app = express()

app.get("/api/products", (req, res) => {

    const products = [
        {
            id: 1,
            name: "iphone",
            price: "$200",
            image: "https://images.pexels.com/photos/3571093/pexels-photo-3571093.jpeg"
        },
        {
            id: 2,
            name: "gimble",
            price: "$100",
            image: "https://images.pexels.com/photos/5341270/pexels-photo-5341270.jpeg"
        },
        {
            id: 3,
            name: "camera",
            price: "$250",
            image: "https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg"
        },
        {
            id: 4,
            name: "printer",
            price: "$100",
            image: "https://images.pexels.com/photos/3831873/pexels-photo-3831873.jpeg"
        },
        {
            id: 5,
            name: "drone",
            price: "$300",
            image: "https://images.pexels.com/photos/12975481/pexels-photo-12975481.jpeg"
        },
    ];

    // http://localhost:3000/api/products?search=table&type=post&

    console.log("req.query is:", req.query);


    if (req.query.search) {
        const searchFiltered = products.filter(product => product.name.includes(req.query.search))
        res.send(searchFiltered)
        return;
    }


    setTimeout(() => {
        res.send(products);
    }, 3000)

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port: ${port}`);

})