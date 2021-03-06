#!/usr/bin/env node

var fs = require("fs"),
    path = require("path"),
    program = require("commander"),
    main,
    Main = require(__dirname + "/../lib/main");

program
    .version(require(__dirname + "/../package.json").version)
    .option(
        "-c, --config [path]",
        "path to configuration file. Default: ./db2md.json",
        path.resolve(process.cwd(), "./db2md.json")
    )
    .option("-o, --output <path>", "file to write output")
    .option("-G, --nogeneratedby", "no write 'Generated by' block")
    .parse(process.argv);

main = new Main(require(path.resolve(process.cwd(), program.config)));

main.run(function (errors, data) {
    var output = data,
        outputPath;
    if (program.nogeneratedby !== true) {
        output += "\n<small>Generated by [db2md](https://github.com/index0h/node-db2md)</small>";
    }

    if (program.output === undefined) {
        console.log(output);
    } else {
        outputPath = path.resolve(process.cwd(), program.output);
        fs.writeFile(outputPath, output, function (errors) {
            if ((errors !== null) && (errors !== undefined)) {
                console.error(errors);
            }
        });
    }
});