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

process.stdout.write("\x1Bc");

const { Client, Options } = require("discord.js-selfbot-v13");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const config = require("./config.json");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (config.settings.deleteduplicatetokens) {
    cp.execSync("node deletedup.js");
}

let tokens = fs
    .readFileSync("alttokens.txt", "utf8")
    .split("\n")
    .filter(Boolean);

let snipedcodes = new Set();
let snipedtokens = new Set();

if (fs.existsSync("snipedtokens.txt")) {
    const loadedTokens = fs
        .readFileSync("snipedtokens.txt", "utf8")
        .split("\n")
        .filter(Boolean);
    snipedtokens = new Set(loadedTokens);
}
const codeRegex =
    /(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)[^\s]+/gim;

const tokenRegex =
    /([a-zA-Z0-9_\-]{24,28})\.([a-zA-Z0-9_\-]{6})\.([a-zA-Z0-9_\-]{27,})/g;

let global = {
    loggedInTokens: 0,
    totalGuilds: 0,
    totalChannels: 0,
    tokens: tokens,
    config: config,
    sets: {
        snipedcodes: snipedcodes,
        snipedtokens: snipedtokens,
    },
    regexs: {
        code: codeRegex,
        token: tokenRegex,
    },
};

(async () => {
    for (let i = 0; i < tokens.length; i++) {
        const xToken = tokens[i].trim();
        const xClient = new Client({
            makeCache: Options.cacheWithLimits({
                MessageManager: 10,
                PresenceManager: 0,
                ReactionManager: 0,
            }),
            sweepers: {
                ...Options.DefaultSweeperSettings,
                messages: { interval: 300, lifetime: 10 },
                users: {
                    interval: 200,
                    filter: () => (user) =>
                        user.bot && user.id !== user.client.user.id,
                },
            },
        });
        require("./utils/ready.js")(xClient, chalk, global);

        if (config.settings.sniper.code) {
            require("./utils/code.js")(xClient, chalk, fs, path, global);
        }
        if (config.settings.sniper.token) {
            require("./utils/token.js")(xClient, chalk, fs, path, global);
        }
        if (config.settings.sniper.messagelog) {
            require("./utils/messagelog.js")(xClient, chalk, fs, path, global);
        }

        xClient.once("ready", () => {
            if (config.settings.sniper.giveaway) {
                require("./utils/giveaway.js")(
                    xClient,
                    chalk,
                    fs,
                    path,
                    global
                );
            }
        });

        try {
            await xClient.login(xToken);
        } catch (error) {
            if (error.message.includes("TOKEN_INVALID")) {
                console.log(
                    chalk.red(`Invalid token detected and removed: ${xToken}`)
                );
                tokens.splice(i, 1);
                fs.writeFileSync("alttokens.txt", tokens.join("\n"));
                i--;
            } else {
                console.error(
                    chalk.red(`Error logging in with token: ${error.message}`)
                );
            }
        }

        await delay(1000);
    }
    process.stdout.write("\x1Bc");
    console.log(chalk.green.bold("Settings:"));

    function boolToStatus(value) {
        if (typeof value === "boolean") {
            return value ? "active" : "inactive";
        } else if (typeof value === "string") {
            return value.toLowerCase() === "true" ? "active" : "inactive";
        }
        return "unknown";
    }

    for (const [key, value] of Object.entries(config.settings)) {
        if (typeof value === "object") {
            console.log(chalk.green.bold(`${key.toUpperCase()} Settings:`));
            for (const [subKey, subValue] of Object.entries(value)) {
                console.log(
                    chalk.cyan(
                        `${subKey.charAt(0).toUpperCase() + subKey.slice(1)}:`
                    ),
                    chalk.yellow(boolToStatus(subValue))
                );
            }
        } else {
            console.log(
                chalk.cyan(`${key.charAt(0).toUpperCase() + key.slice(1)}:`),
                chalk.yellow(boolToStatus(value))
            );
        }
    }
    console.log(
        chalk.green.bold(
            `A total of ${global.loggedInTokens} tokens have successfully logged in.`
        )
    );
    console.log(
        chalk.green.bold(
            `Total ${global.totalGuilds} guilds and ${global.totalChannels} channels are listening.`
        )
    );
})();

process.on("unhandledRejection", (reason, p) => {
    console.log(
        chalk.blue(chalk.bold(`[antiCrash]`)),
        chalk.white(`>>`),
        chalk.magenta(`Unhandled Rejection/Catch`),
        chalk.red(reason, p)
    );
});
process.on("uncaughtException", (err, origin) => {
    console.log(
        chalk.blue(chalk.bold(`[antiCrash]`)),
        chalk.white(`>>`),
        chalk.magenta(`Unhandled Exception/Catch`),
        chalk.red(err, origin)
    );
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(
        chalk.blue(chalk.bold(`[antiCrash]`)),
        chalk.white(`>>`),
        chalk.magenta(`Uncaught Exception/Catch`),
        chalk.red(err, origin)
    );
});
