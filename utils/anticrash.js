module.exports = () => {
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
};
