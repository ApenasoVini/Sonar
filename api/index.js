import Express from 'express';

const app = Express();
app.use(Express.json())

app.post('/registro', (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
        res.send('Você deve preencher todos os campos')
        return
    }
    res.send(200)
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) {
        res.send('Você deve preencher todos os campos')
        return
    }
    res.send(200)
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
