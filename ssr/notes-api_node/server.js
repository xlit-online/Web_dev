const http = require('http');

const fs = require('fs');

const PORT = 5000;
const FILE = 'notes.json';

function getNotes() {
    const data = fs.readFileSync(FILE, 'utf-8');
    return JSON.parse(data);
}

