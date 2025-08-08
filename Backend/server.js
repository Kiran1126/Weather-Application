import 'dotenv/config';
import http from 'http';
import { parse } from 'url';
import axios from 'axios';

const PORT = 3000;

const server = http.createServer(async (req, res) => {

  const parsedURL = parse(req.url, true);
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  if(parsedURL.pathname === '/api/weather' && req.method === 'GET') {
    const city = parsedURL.query.city;
    if(!city) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({error : 'City is required'}));
      return;
    }
    try {
      const API = process.env.WEATHER_API_KEY;
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API}`;
      const response = await axios.get(URL);
      
      res.writeHead(200, headers);
      res.end(JSON.stringify(response.data));
    } catch (error) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({error : 'Failed to fetch weather'}));
    }
  } else {
      res.writeHead(404, headers);
      res.end(JSON.stringify({error : 'Not found'}));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});