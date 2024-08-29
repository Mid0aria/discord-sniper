const axios = require("axios");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getSkuName(code) {
    try {
        const response = await axios.get(
            `https://discordapp.com/api/v9/entitlements/gift-codes/${code}`,
            {}
        );

        if (response.status === 200) {
            return response.data.store_listing.sku.name;
        } else {
            throw new Error("Failed to fetch SKU name.");
        }
    } catch (error) {
        console.error(
            `An error occurred while fetching SKU name for code ${code}:`,
            error.response ? error.response.data : error.message
        );
        return null;
    }
}

function sanitizeName(name) {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

module.exports = (client, chalk, fs, path, global) => {
    client.on("messageCreate", async (message) => {
        const codeMatch = message.content.match(global.regexs.code);
        if (codeMatch) {
            if (global.config.settings.logs.code) {
                let isguild = false;

                if (message.guild.name.length > 0) {
                    isguild = true;
                }
                const logfolderPath = path.join(
                    __dirname,
                    "../logs",
                    "codelogs",
                    sanitizeName(client.user.username),
                    sanitizeName(
                        isguild ? message.guild.name : message.author.tag
                    )
                );

                const logFilePath = path.join(logfolderPath, "code_logs.txt");

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

            const code = codeMatch[0].split("/").pop();

            if (global.sets.snipedcodes.has(code)) {
                return;
            }

            global.sets.snipedcodes.add(code);

            try {
                const response = await axios.post(
                    `https://discord.com/api/v9/entitlements/gift-codes/${code}/redeem`,
                    {},
                    {
                        headers: {
                            Authorization: `${global.config.maintoken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    const skuName = await getSkuName(code);

                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.green(
                            "Code successfully redeemed!"
                        )} - ${code} - ${chalk.cyan(`Product: ${skuName}`)}`
                    );
                } else {
                    console.log(
                        `[${chalk.magenta(client.user.username)}] - ${chalk.red(
                            "Code could not be used."
                        )} - ${code}`
                    );
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.data.retry_after * 1000;
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - Rate limit exceeded. Waiting for ${retryAfter} ms...`
                    );
                    await delay(retryAfter);
                } else if (
                    error.response &&
                    error.response.data.code === 10038
                ) {
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.blue("The Unknown Code")}: ${code}`
                    );
                } else if (
                    error.response &&
                    error.response.data.code === 50050
                ) {
                    const skuName = await getSkuName(code);
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.yellow(
                            "This code has already been used"
                        )} - ${code} - ${chalk.cyan(`Product: ${skuName}`)}`
                    );
                } else if (
                    error.response &&
                    error.response.data.code === 50051
                ) {
                    const skuName = await getSkuName(code);
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.yellow(
                            "You already have the content(SKU) of this code."
                        )} - ${code} - ${chalk.cyan(`Product: ${skuName}`)}`
                    );
                } else if (
                    error.response &&
                    error.response.data.code === 50070
                ) {
                    const skuName = await getSkuName(code);
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.yellow(
                            "Payment source required to redeem gift."
                        )} - ${code} - ${chalk.cyan(`Product: ${skuName}`)}`
                    );
                } else {
                    console.error(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - An error has occurred:`,
                        error.response ? error.response.data : error.message
                    );
                }
            }
        }
    });
};
