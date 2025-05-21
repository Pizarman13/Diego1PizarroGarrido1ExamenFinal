const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const DATA_FILE = path.join(__dirname, 'entries.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /entries
app.get('/entries', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudieron leer las entradas' });
    }
});

// POST /entries
app.post('/entries', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Datos incompletos' });

    try {
        const file = await fs.readFile(DATA_FILE, 'utf-8');
        const entries = JSON.parse(file);
        const newEntry = { id: uuidv4(), title, content };
        entries.push(newEntry);
        await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
        res.status(201).json(newEntry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo guardar la entrada' });
    }
});

// DELETE /entries/:id
app.delete('/entries/:id', async (req, res) => {
    try {
        const file = await fs.readFile(DATA_FILE, 'utf-8');
        let entries = JSON.parse(file);
        const initialLen = entries.length;
        entries = entries.filter(e => e.id !== req.params.id);
        if (entries.length === initialLen) return res.status(404).json({ error: 'No encontrada' });
        await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar entrada' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
