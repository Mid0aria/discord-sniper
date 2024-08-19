module.exports = (client, chalk, global) => {
    client.once("ready", () => {
        client.user.setStatus("offline");

        global.loggedInTokens++;
        global.totalGuilds += client.guilds.cache.size;
        global.totalChannels += client.channels.cache.size;
        let ramUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

        let data = [
            {
                "Logged In Tokens": `${global.loggedInTokens} / ${global.tokens.length}`,
                "Total Guilds": `${global.totalGuilds}`,
                "Total Channels": `${global.totalChannels}`,
                "RAM Usage (MB)": `${ramUsage}`,
            },
        ];

        process.stdout.write("\x1Bc");
        console.table(data);

        // console.log(
        //     chalk.blue(
        //         chalk.bold(
        //             `${global.loggedInTokens} / ${global.tokens.length} - Bot`
        //         )
        //     ),
        //     chalk.white(`>>`),
        //     chalk.red(`${client.user.username}`),
        //     chalk.green(`is ready!`),
        //     chalk.white(`>>`),
        //     chalk.yellow(`${client.guilds.cache.size}`),
        //     chalk.green(`guild and`),
        //     chalk.yellow(`${client.channels.cache.size}`),
        //     chalk.green(`channel is listening!!!`)
        // );

        process.title = `Tokens: ${global.loggedInTokens} Guilds: ${global.totalGuilds} Channels: ${global.totalChannels}`;
    });
};
