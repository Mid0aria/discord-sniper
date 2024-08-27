const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sanitizeName(name) {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

function logMessage(message, fs, path, client) {
    const logfolderPath = path.join(
        __dirname,
        "../logs",
        "messagelogs",
        sanitizeName(client.user.username),
        sanitizeName(message.guild.name)
    );

    const logFilePath = path.join(logfolderPath, "message_logs.txt");

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

module.exports = (client, chalk, fs, path, global) => {
    client.on("messageCreate", async (message) => {
        if (message.content.trim() === "") return;
        if (
            global.config.messagelog.guilds.length === 0 &&
            global.config.messagelog.channels.length === 0
        ) {
            logMessage(message, fs, path, client);
        } else if (
            global.config.messagelog.guilds.includes(message.guild.id) ||
            global.config.messagelog.channels.includes(message.channel.id)
        ) {
            logMessage(message, fs, path, client);
        }
    });
};
