const cp = require("child_process");
// auto install dependencies
const packageJson = require("./package.json");
for (let dep of Object.keys(packageJson.dependencies)) {
    try {
        require.resolve(dep);
    } catch (err) {
        console.log(`Installing dependencies...`);
        cp.execSync(`npm i`);
    }
}

const { Client } = require("discord.js-selfbot-v13");
const axios = require("axios");
const fs = require("fs");
const chalk = require("chalk");
const config = require("./config.json");

const redeemToken = config.maintoken;
const tokens = fs
    .readFileSync("alttokens.txt", "utf8")
    .split("\n")
    .filter(Boolean);

let totalGuilds = 0;
let loggedInTokens = 0;
let redeemedCodes = new Set();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const nitroRegex =
    /(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)[^\s]+/gim;

(async () => {
    for (let i = 0; i < tokens.length; i++) {
        const xToken = tokens[i].trim();
        const xClient = new Client({});

        xClient.once("ready", () => {
            xClient.user.setStatus("offline");
            loggedInTokens++;

            console.log(
                chalk.blue(chalk.bold(`${loggedInTokens} - Bot`)),
                chalk.white(`>>`),
                chalk.red(`${xClient.user.username}`),
                chalk.green(`is ready!`),
                chalk.white(`>>`),
                chalk.yellow(`${xClient.guilds.cache.size}`),
                chalk.green(`guild is listening!!!`)
            );

            totalGuilds += xClient.guilds.cache.size;
        });

        xClient.on("messageCreate", async (message) => {
            const nitroMatch = message.content.match(nitroRegex);
            if (nitroMatch) {
                const nitroCode = nitroMatch[0].split("/").pop();

                if (redeemedCodes.has(nitroCode)) {
                    return;
                }

                redeemedCodes.add(nitroCode);

                console.log(`Bulunan Nitro Kodu: ${nitroCode}`);

                try {
                    const response = await axios.post(
                        `https://discord.com/api/v9/entitlements/gift-codes/${nitroCode}/redeem`,
                        {},
                        {
                            headers: {
                                Authorization: `${redeemToken}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        console.log("Nitro code successfully redeemed!");
                    } else {
                        console.log("Nitro code could not be used.");
                    }
                } catch (error) {
                    if (error.response && error.response.status === 429) {
                        const retryAfter =
                            error.response.data.retry_after * 1000;
                        console.log(
                            `Rate limit exceeded. Waiting for ${retryAfter} ms...`
                        );
                        await delay(retryAfter);
                    } else if (
                        error.response &&
                        error.response.data.code === 10038
                    ) {
                        console.log(`The Unknown Nitro Code: ${nitroCode}`);
                    } else if (
                        error.response &&
                        error.response.data.code === 50050
                    ) {
                        console.log(
                            `This Nitro code has already been used: ${nitroCode}`
                        );
                    } else {
                        console.error(
                            "An error has occurred:",
                            error.response ? error.response.data : error.message
                        );
                    }
                }
            }
        });

        await xClient.login(xToken);
        await delay(1000);
    }

    console.log(
        chalk.green.bold(
            `A total of ${loggedInTokens} tokens have successfully logged in.`
        )
    );
    console.log(
        chalk.green.bold(`Total ${totalGuilds} servers are listening.`)
    );
})();
