import express from 'express'

const app = express();
app.use(express.static("public"));

app.get('/', (_req, res)=>{
    res.send('Hello, World!');
})

export default app;