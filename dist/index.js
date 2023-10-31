"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const fast_xml_parser_1 = require("fast-xml-parser");
const promises_1 = require("fs/promises");
const main = async () => {
    const f = await (0, promises_1.readFile)(`${process.env.GITHUB_WORKSPACE}/pom.xml`, { encoding: "utf8" });
    const options = {
        ignoreAttributes: true
    };
    const parser = new fast_xml_parser_1.XMLParser(options);
    let jsonObj = parser.parse(f);
    if ("version" in jsonObj) {
        return jsonObj.version;
    }
    else {
        core.debug(jsonObj);
        throw Error("version not found");
    }
};
main().then(version => {
    console.log("Successfully parsed pom.xml. Version is " + version);
    core.setOutput("version", version);
}).catch(err => {
    console.error(err);
    core.setFailed(err.message);
});
//# sourceMappingURL=index.js.map