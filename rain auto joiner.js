// My tag, remove if you don't like me...
console.log(`%c██████╗░░░██╗██╗██████╗░██╗░░██╗\n██╔══██╗░██╔╝██║██╔══██╗██║░██╔╝\n██║░░██║██╔╝░██║██████╔╝█████═╝░\n██║░░██║███████║██╔══██╗██╔═██╗░\n██████╔╝╚════██║██║░░██║██║░╚██╗\n╚═════╝░░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝\n░██████╗░█████╗░██████╗░░░███╗░░██████╗░████████╗░██████╗\n██╔════╝██╔══██╗██╔══██╗░████║░░██╔══██╗╚══██╔══╝██╔════╝\n╚█████╗░██║░░╚═╝██████╔╝██╔██║░░██████╔╝░░░██║░░░╚█████╗░\n░╚═══██╗██║░░██╗██╔══██╗╚═╝██║░░██╔═══╝░░░░██║░░░░╚═══██╗\n██████╔╝╚█████╔╝██║░░██║███████╗██║░░░░░░░░██║░░░██████╔╝\n╚═════╝░░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░░░░░░░╚═╝░░░╚═════╝░`, "color: red");
console.log('%cThis script is made for the bloxmoon console and only the bloxmoon console.\nRunning this elsewhere may throw an error.', "color: yellow")

// Declare variables with clear names
let socketId = null;
let jackpotBanks = null;

// Use descriptive function names
async function joinJackpotRain(socketId) {
  try {
    const response = await fetch("https://bloxmoon.com/api/jackpot/subscribe", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://bloxmoon.com/crash",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{"socketId":"${socketId}"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    if (!response.ok) {
      throw new Error(`Failed to join jackpot rain: ${response.statusText}`);
    }

    console.log('Joined jackpot rain successfully!');
  } catch (error) {
    console.error('Error joining jackpot rain:', error);
  }
}

async function main() {
  const initialMessages = [
    `420["join_history",{"game":"all"}]`,
    `421["jackpot:join"]`,
    `422["join_chat",{"lobby":"General"}]`,
    `423["join_coin_flip"]`,
    `424["join_chat",{"lobby":"General"}]`
  ];

  const socket = new WebSocket('wss://bloxmoon.com/broker/socket.io/?EIO=4&transport=websocket');

  socket.addEventListener('open', () => {
    console.log('%cConnected to server', "color: lightgreen");
  });

  socket.addEventListener('message', (event) => {
    const message = event.data;

    if (message.startsWith('0')) {
      socket.send('40');
    } else if (message.startsWith('40')) {
      var socketId = JSON.parse(message.split("40")[1]).sid;
      console.log('Socket ID:', socketId);

      initialMessages.forEach(message => socket.send(message));
      console.log('%cWebSocket started successfully!', "color: lightgreen");
    } else if (message.startsWith('2')) {
      socket.send('3');
    } else if (message.startsWith('42["jackpot:banks",')) {
      jackpotBanks = JSON.parse(message.split('42["jackpot:banks",')[1].slice(0, -1));

      if (jackpotBanks.subscribers && jackpotBanks.subscribers > 0) {
        joinJackpotRain(socketId);
      }
    }
  });

  socket.addEventListener('close', () => {
    console.log('%cConnection closed', "color: red");
    console.log('%cReconnecting...', "color: lightgreen")
    main(); // Retry connection
  });
}

main();