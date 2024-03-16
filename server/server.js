const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] },
});
dotconfig = require('dotenv').config()



const axios = require('axios')

io.on("connection", (socket) => {
  socket.on("message", async (message) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'auto');
    encodedParams.set('target_language', 'es');
    encodedParams.set('text', message);
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    };
    const response = await axios.request(options);
    console.log(response.data);
    transMessage = response.data.data.translatedText
    io.emit("message", transMessage )
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected.")
  })
});