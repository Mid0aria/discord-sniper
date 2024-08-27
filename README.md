dWdnY2Y6Ly9iY3JhLmZjYmd2c2wucGJ6L2dlbnB4LzVwc2tIZ1B4Y3hQVkVlWGxxVVhGb1kgcm90MTM= </br>

<h1 align="center">Discord Nitro Sniper</h1>
<p align="center">

[![Total Views](https://hits.sh/github.com/Mid0aria/discord-sniper.svg?view=today-total&label=Repo%20Today/Total%20Views&color=770ca1&labelColor=007ec6)](https://github.com/Mid0aria/discord-sniper)
[![Last Commit](https://img.shields.io/github/last-commit/mid0aria/discord-sniper)](https://github.com/Mid0aria/discord-sniper)

## Tutorials

### Text

-   [🎈・Installation](#Installation)
    -   [Windows / Linux](#windows--linux) - Official
    -   [Android / iOS (Termux)](#android--ios-termux) - Official

</p>

# Contents

[⭐・Star History](#star-history)<br>
[❗・Important](#important)<br>
[👑・Features](#features)<br>
[⚙・Config.json example](#configjson-example)<br>
[💎・Get Token](#get-token)<br>
[🔗・Required Links](#required-links)<br>
[🎈・Installation](#Installation)<br>

## ⭐・Star History

<h2 align="center">Goal: <a href="https://github.com/Mid0aria/discord-sniper/stargazers"><img src="https://img.shields.io/github/stars/Mid0aria/discord-sniper" /></a> / 512</h2>
⭐⭐⭐ You can also give this repository a star so that others know we're trusted!<br>

[![Star History Chart](https://api.star-history.com/svg?repos=Mid0aria/discord-sniper&type=Date)](https://star-history.com/#Mid0aria/discord-sniper&Date)

## ❗・Important (Anyone using the bot is deemed to have read and accepted these)

-   Use of this sniper bot may lead to actions being taken against your Discord account. We are not responsible for them.
-   You can keep 872 tokens active for 2 days with 6 GB ram (tested by me)

## 👑・Features

-   Support Multi Alt Token
-   Auto Claim All Discord Gift Codes (Nitro, Game, Decoration)
-   Auto Join Giveaways
-   Auto Check Giveaways Channels on Startup
-   Logs all messages on all your DMs and Servers, or all messages on the server or channels of your choice
-   Auto Snipe Tokens
-   Auto Delete Duplicated Tokens
-   Minimized Ram Cache System

## ⚙・config.json example

```
{
    "maintoken": "", / Enter the token of the account to which the codes will be redeem here
    "settings": {
        "deleteduplicatetokens": true, / set this to true if you want to delete duplicate tokens
        "sniper": { / whichever sniper setting you want to enable, set it to the true
            "code": false,
            "token": false,
            "giveaway": false,
            "messagelog": false
        }
    }
    "logs": { / set the setting you want to log to true
        "code": false,
        "token": false
    },
    "messagelog": { / if you want all servers and dm's to be logged leave [] empty
        "guilds": ["guildid1","guildid2"...], / type the ids of the servers you want to log
        "channels": ["channelid1","channelid2"...] / type the ids of the channels and dm's you want to log
    },
    "webhooks": { / enter your discord webhook link in the setting you want to receive webhook notification
        "giveaway": ""
    }
}

```

## 💎・Get Token

[Geeks for Geeks - How to get discord token](https://www.geeksforgeeks.org/how-to-get-discord-token/)

### PC

1. Open your preferred browser (with developer tools) and login to https://discord.com/app
2. Press CTRL + Shift + I and open the Console tab.
3. Paste the following code.
4. The text returned (excluding the quotes `'`) will be your Discord account token.

```js
(webpackChunkdiscord_app.push([
    [""],
    {},
    (e) => {
        for (let t in ((m = []), e.c)) m.push(e.c[t]);
    },
]),
m)
    .find((e) => e?.exports?.default?.getToken !== void 0)
    .exports.default.getToken();
```

### Mobile/Android

1. Open Chrome
2. Create a bookmark (by clicking on star button in 3 dots menu)
3. Edit it and set name to Token Finder and url to the following code:
    ```javascript
    javascript: (webpackChunkdiscord_app.push([[""],{},(e)=>{m=[];for (let c in e.c) m.push(e.c[c]);},]),m).find((m) => m?.exports?.default?.getToken%20!==%20void%200)%20%20%20%20.exports.default.getToken();
    ```
4. Open https://discord.com/app and log in.
5. Tap on search bar and type Token Finder (don't search it just type)
6. Click on the bookmark named Token Finder.
7. A new page will open, the text in the page will be your Discord account token.

## 🔗・Required Links

[NodeJS](https://nodejs.org/en/)<br>
[Terminal](https://apps.microsoft.com/detail/9n0dx20hk701)<br>
[Nitro Sniper ZIP File](https://github.com/Mid0aria/discord-sniper/archive/refs/heads/main.zip)

## 🎈・Installation

### 💻・Windows / Linux

```bash
# Check Node.js version:
node -v

# Clone the files with git:
git clone https://github.com/Mid0aria/discord-sniper
# Optionally you can also download from github at https://github.com/Mid0aria/discord-sniper/archive/refs/heads/main.zip

# Enter into the cloned directory:
cd discord-sniper

# Configure the bot:
notepad config.json # On windows
nano config.json # On linux, can also use any other preferred file writing software

# Put your alt tokens in alttokens.txt
notepad alttokens.txt # On windows
nano alttokens.txt # On linux, can also use any other preferred file writing software

# Run the bot:
start ./start.bat
or
node bot.js

```

### 📱・Android / iOS (Termux)

```bash
# Install:

apt update -y && apt upgrade -y && pkg install wget
wget https://raw.githubusercontent.com/mid0aria/discord-sniper/main/termux-setup.sh
sh termux-setup.sh

# Configure the bot:

cd discord-sniper
nano config.json
nano alttokens.txt # (Put your alt tokens in alttokens.txt)

# Run the bot:
sh start.sh
or
node bot.js

```
