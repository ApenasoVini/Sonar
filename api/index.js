import Express from 'express';

const app = Express();
app.use(Express.json())


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
