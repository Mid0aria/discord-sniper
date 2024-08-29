module.exports = async (client, chalk, fs, path, global) => {
    async function webhooksender(
        bot,
        action,
        channelId,
        serverName,
        ping,
        webhookurl = global.config.webhooks.giveaway
    ) {
        const { WebhookClient } = require("discord.js-selfbot-v13");
        const webhookClient = new WebhookClient({
            url: webhookurl,
        });
        await webhookClient.send({
            content: `**Bot:**${bot}\n**Action:**${action}\n**Server:** ${serverName}\n**Channel:** <#${channelId}>\n<@${ping}>`,
            username: "DC_Sniper - Giveaway Log",
        });
    }

    const giveawayjsonfolderpath = path.join(__dirname, "../data", "giveaway");

    if (!fs.existsSync(giveawayjsonfolderpath)) {
        fs.mkdirSync(giveawayjsonfolderpath, { recursive: true });
    }

    const giveawayjsonpath = path.join(
        giveawayjsonfolderpath,
        "giveaway_channels.json"
    );

    function loadJSON() {
        if (fs.existsSync(giveawayjsonpath)) {
            return JSON.parse(fs.readFileSync(giveawayjsonpath, "utf8"));
        }
        return {};
    }

    function saveJSON(data) {
        fs.writeFileSync(
            giveawayjsonpath,
            JSON.stringify(data, null, 2),
            "utf8"
        );
    }

    function addChannelToJSON(userId, channelId) {
        let data = loadJSON();
        if (!data[userId]) {
            data[userId] = [];
        }
        if (!data[userId].includes(channelId)) {
            data[userId].push(channelId);
        }
        saveJSON(data);
    }

    async function checkGiveawaysOnStartup() {
        if (fs.existsSync(giveawayjsonpath)) {
            const data = JSON.parse(fs.readFileSync(giveawayjsonpath, "utf8"));
            const savedChannels = data[client.user.id] || [];

            for (const channelId of savedChannels) {
                const channel = await client.channels.fetch(channelId);
                if (channel) {
                    const messages = await channel.messages.fetch({
                        limit: 10,
                    });
                    for (const message of messages.values()) {
                        if (
                            message.author.id === "294882584201003009" &&
                            message.components.length > 0 &&
                            message.components[0].components.some(
                                (button) =>
                                    button.customId.toLowerCase() ===
                                    "enter-giveaway"
                            )
                        ) {
                            let joinButton =
                                message.components[0].components.find(
                                    (button) =>
                                        button.customId.toLowerCase() ===
                                        "enter-giveaway"
                                );

                            if (
                                joinButton &&
                                !joinButton.disabled &&
                                joinButton.customId
                            ) {
                                try {
                                    await message.clickButton(
                                        joinButton.customId
                                    );
                                    if (
                                        global.config.webhooks.giveaway.length >
                                        90
                                    ) {
                                        webhooksender(
                                            "GiveawayBot#2381",
                                            "Joined",
                                            message.channel.id,
                                            message.guild.name,
                                            client.user.id
                                        );
                                    }
                                    console.log(
                                        `[${chalk.magenta(
                                            client.user.username
                                        )}] - ${chalk.green(
                                            "Joined Giveaway"
                                        )} - ${chalk.blue(
                                            "GiveawayBot#2381"
                                        )} - ${chalk.cyan(
                                            `Server: ${message.guild.name}`
                                        )} - ${chalk.yellow(
                                            `Channel ID: ${message.channel.id}`
                                        )}`
                                    );
                                } catch (error) {
                                    console.error(
                                        `Failed to click button: ${
                                            error.message
                                        } - ${chalk.red("BUTTON_CANNOT_CLICK")}`
                                    );
                                }
                            } else {
                                console.log(
                                    "Button is either disabled or missing a custom_id."
                                );
                            }
                        }

                        if (
                            message.author.id === "530082442967646230" &&
                            message.components.length > 0 &&
                            message.components[0].components.some(
                                (button) =>
                                    button.customId.toLowerCase() ===
                                    "giveaway_message"
                            )
                        ) {
                            let joinButton =
                                message.components[0].components.find(
                                    (button) =>
                                        button.customId.toLowerCase() ===
                                        "giveaway_message"
                                );

                            if (
                                joinButton &&
                                !joinButton.disabled &&
                                joinButton.customId
                            ) {
                                try {
                                    await message.clickButton(
                                        joinButton.customId
                                    );
                                    if (
                                        global.config.webhooks.giveaway.length >
                                        90
                                    ) {
                                        webhooksender(
                                            "Giveaway Boat#2911",
                                            "Joined",
                                            message.channel.id,
                                            message.guild.name,
                                            client.user.id
                                        );
                                    }
                                    console.log(
                                        `[${chalk.magenta(
                                            client.user.username
                                        )}] - ${chalk.green(
                                            "Joined Giveaway"
                                        )} - ${chalk.blue(
                                            "Giveaway Boat#2911"
                                        )} - ${chalk.cyan(
                                            `Server: ${message.guild.name}`
                                        )} - ${chalk.yellow(
                                            `Channel ID: ${message.channel.id}`
                                        )}`
                                    );
                                } catch (error) {
                                    console.error(
                                        `Failed to click button: ${
                                            error.message
                                        } - ${chalk.red("BUTTON_CANNOT_CLICK")}`
                                    );
                                }
                            } else {
                                console.log(
                                    "Button is either disabled or missing a custom_id."
                                );
                            }
                        }

                        if (
                            message.author.id === "490039330388180992" &&
                            message.components.length > 0 &&
                            message.components[0].components.some(
                                (button) =>
                                    button.customId.toLowerCase() ===
                                    "yok:giveaway"
                            )
                        ) {
                            let joinButton =
                                message.components[0].components.find(
                                    (button) =>
                                        button.customId.toLowerCase() ===
                                        "yok:giveaway"
                                );

                            if (
                                joinButton &&
                                !joinButton.disabled &&
                                joinButton.customId
                            ) {
                                try {
                                    await message.clickButton(
                                        joinButton.customId
                                    );
                                    if (
                                        global.config.webhooks.giveaway.length >
                                        90
                                    ) {
                                        webhooksender(
                                            "Marpel#2574",
                                            "Joined",
                                            message.channel.id,
                                            message.guild.name,
                                            client.user.id
                                        );
                                    }
                                    console.log(
                                        `[${chalk.magenta(
                                            client.user.username
                                        )}] - ${chalk.green(
                                            "Joined Giveaway"
                                        )} - ${chalk.blue(
                                            "Marpel#2574"
                                        )} - ${chalk.cyan(
                                            `Server: ${message.guild.name}`
                                        )} - ${chalk.yellow(
                                            `Channel ID: ${message.channel.id}`
                                        )}`
                                    );
                                } catch (error) {
                                    console.error(
                                        `Failed to click button: ${
                                            error.message
                                        } - ${chalk.red("BUTTON_CANNOT_CLICK")}`
                                    );
                                }
                            } else {
                                console.log(
                                    "Button is either disabled or missing a custom_id."
                                );
                            }
                        }
                    }
                }
            }
        }
    }

    checkGiveawaysOnStartup();

    client.on("messageCreate", async (message) => {
        let msgcontent = message.content.toLowerCase();

        if (message.author.id === "294882584201003009") {
            if (
                message.components.length > 0 &&
                message.components[0].components.find(
                    (button) =>
                        button.customId.toLowerCase() === `enter-giveaway`
                )
            ) {
                let joinbutton = message.components[0].components.find(
                    (button) =>
                        button.customId.toLowerCase() === `enter-giveaway`
                );
                if (!joinbutton.customId || joinbutton.disabled) return;
                if (joinbutton) {
                    await message.clickButton(joinbutton.customId);
                    addChannelToJSON(client.user.id, message.channel.id);

                    if (global.config.webhooks.giveaway.length > 90) {
                        webhooksender(
                            "GiveawayBot#2381",
                            "Joined",
                            message.channel.id,
                            message.guild.name,
                            client.user.id
                        );
                    }
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.green("Joined Giveaway")} - ${chalk.blue(
                            "GiveawayBot#2381"
                        )} - ${chalk.cyan(
                            `Server: ${message.guild.name}`
                        )} - ${chalk.yellow(
                            `Channel ID: ${message.channel.id}`
                        )}`
                    );
                }
            }
            if (msgcontent.includes(`congratulations <@${client.user.id}>!`)) {
                if (global.config.webhooks.giveaway.length > 90) {
                    webhooksender(
                        "GiveawayBot#2381",
                        "You WON",
                        message.channel.id,
                        message.guild.name,
                        client.user.id
                    );
                }
                console.log(
                    `[${chalk.magenta(client.user.username)}] - ${chalk.green(
                        "You WON"
                    )} - ${chalk.blue("GiveawayBot#2381")} - ${chalk.cyan(
                        `Server: ${message.guild.name}`
                    )} - ${chalk.yellow(`Channel ID: ${message.channel.id}`)}`
                );
            }
        }
        if (message.author.id === "530082442967646230") {
            if (
                message.components.length > 0 &&
                message.components[0].components.find(
                    (button) =>
                        button.customId.toLowerCase() === `giveaway_message`
                )
            ) {
                let joinbutton = message.components[0].components.find(
                    (button) =>
                        button.customId.toLowerCase() === `giveaway_message`
                );
                if (!joinbutton.customId || joinbutton.disabled) return;
                if (joinbutton) {
                    await message.clickButton(joinbutton.customId);
                    addChannelToJSON(client.user.id, message.channel.id);

                    if (global.config.webhooks.giveaway.length > 90) {
                        webhooksender(
                            "Giveaway Boat#2911",
                            "Joined",
                            message.channel.id,
                            message.guild.name,
                            client.user.id
                        );
                    }
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.green("Joined Giveaway")} - ${chalk.blue(
                            "Giveaway Boat#2911"
                        )} - ${chalk.cyan(
                            `Server: ${message.guild.name}`
                        )} - ${chalk.yellow(
                            `Channel ID: ${message.channel.id}`
                        )}`
                    );
                }
            }
            if (
                msgcontent.includes(`congratulations to <@${client.user.id}>`)
            ) {
                if (global.config.webhooks.giveaway.length > 90) {
                    webhooksender(
                        "Giveaway Boat#2911",
                        "You WON",
                        message.channel.id,
                        message.guild.name,
                        client.user.id
                    );
                }
                console.log(
                    `[${chalk.magenta(client.user.username)}] - ${chalk.green(
                        "You WON"
                    )} - ${chalk.blue("Giveaway Boat#2911")} - ${chalk.cyan(
                        `Server: ${message.guild.name}`
                    )} - ${chalk.yellow(`Channel ID: ${message.channel.id}`)}`
                );
            }
        }
        if (message.author.id === "490039330388180992") {
            if (
                message.components.length > 0 &&
                message.components[0].components.find(
                    (button) => button.customId.toLowerCase() === `yok:giveaway`
                )
            ) {
                let joinbutton = message.components[0].components.find(
                    (button) => button.customId.toLowerCase() === `yok:giveaway`
                );
                if (!joinbutton.customId || joinbutton.disabled) return;
                if (joinbutton) {
                    await message.clickButton(joinbutton.customId);
                    addChannelToJSON(client.user.id, message.channel.id);

                    if (global.config.webhooks.giveaway.length > 90) {
                        webhooksender(
                            "Marpel#2574",
                            "Joined",
                            message.channel.id,
                            message.guild.name,
                            client.user.id
                        );
                    }
                    console.log(
                        `[${chalk.magenta(
                            client.user.username
                        )}] - ${chalk.green("Joined Giveaway")} - ${chalk.blue(
                            "Marpel#2574"
                        )} - ${chalk.cyan(
                            `Server: ${message.guild.name}`
                        )} - ${chalk.yellow(
                            `Channel ID: ${message.channel.id}`
                        )}`
                    );
                }
            }
            if (
                msgcontent.includes("<:kral:959550081672024094>") &&
                msgcontent.includes(`<@${client.user.id}>`)
            ) {
                if (global.config.webhooks.giveaway.length > 90) {
                    webhooksender(
                        "Marpel#2574",
                        "You WON",
                        message.channel.id,
                        message.guild.name,
                        client.user.id
                    );
                }
                console.log(
                    `[${chalk.magenta(client.user.username)}] - ${chalk.green(
                        "You WON"
                    )} - ${chalk.blue("Marpel#2574")} - ${chalk.cyan(
                        `Server: ${message.guild.name}`
                    )} - ${chalk.yellow(`Channel ID: ${message.channel.id}`)}`
                );
            }
        }
    });
};
