import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycby1bw-HhxW_g1nAknEnRlgiGGoU2g4sbCJSJynL60Bl-1qWaZX3hfQjQ6GH3jo5eM_A/exec',
        req.body
      );
      res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error("Error:", error); // Log toàn bộ lỗi

      res.status(500).json({ error: 'Failed to send data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
