import fs from 'fs/promises';
import path from 'path';
import express from 'express';

interface Message {
  role: string;
  content: string;
}

const app = express();
const conversationsDir = process.env.LLT_PATH + '/ll';

app.use(express.static('public'));

app.get('/api/ll', async (req, res) => {
  try {
    const files = await fs.readdir(conversationsDir);
    const conversationFiles = files.filter((file) => path.extname(file) === '.ll');
    res.json(conversationFiles);
  } catch (err) {
    console.error('Error reading conversations directory:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ll/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(conversationsDir, filename);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const messages: Message[] = JSON.parse(data);
    res.json(messages);
  } catch (err) {
    console.error('Error reading conversation file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});