import express from 'express'

const app = express()


// app.get("/", (req, res) => {
//     res.send("The fucking server is ready.")
// })


//bad practice method to reduce server cost
app.use(express.static("dist"))


// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "a joke",
            content: "this is a joke"
        },
        {
            id: 2,
            title: "a joke",
            content: "this is an another joke"
        },
        {
            id: 3,
            title: "a joke",
            content: "this is third number joke"
        },
        {
            id: 4,
            title: "a joke",
            content: "this is fourth joke"
        },
        {
            id: 5,
            title: "a joke",
            content: "this is fifth joke"
        },

    ];
    res.send(jokes);
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}}`);
})


