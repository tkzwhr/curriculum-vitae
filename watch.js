const { exec } = require('child_process')
const chokidar = require('chokidar');

const watcher = chokidar.watch("./*.(md|json|css)");

let proc = null;

watcher.on("ready", () => {
    process.stdout.write("Watching files...\n");

    watcher.on("all", () => {
        if (proc) {
            process.kill(proc.pid);
            proc = null;
        }

        process.stdout.write("Rebuilding...");
        proc = exec("yarn run build", (error) => {
            if (!error) {
                process.stdout.write("Finished\n");
            }
            proc = null;
        });
    });
});
