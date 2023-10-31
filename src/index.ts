import * as core from "@actions/core";
import { XMLParser } from "fast-xml-parser";
import { readFile } from "fs/promises";

const main = async () : Promise<string> => {
    const f = await readFile(`${process.env.GITHUB_WORKSPACE}/pom.xml`, {encoding: "utf8"});
    const options = {
        ignoreAttributes : true
    };
    const parser = new XMLParser(options);
    let pom = parser.parse(f);
    let version = pom?.project?.version;
    if (version === undefined) {
        throw Error("could not parse version from pom.xml");
    }
    return version;
}

main().then(version => {
    console.info("Successfully parsed pom.xml. Version is " + version);
    core.setOutput("version", version);
}).catch(err => {
    console.error(err);
    core.setFailed(err.message);
});
