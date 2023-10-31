"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const fast_xml_parser_1 = require("fast-xml-parser");
const promises_1 = require("fs/promises");
const main = async () => {
    var _a;
    const f = await (0, promises_1.readFile)(`${process.env.GITHUB_WORKSPACE}/pom.xml`, { encoding: "utf8" });
    const options = {
        ignoreAttributes: true
    };
    const parser = new fast_xml_parser_1.XMLParser(options);
    let pom = parser.parse(f);
    let version = (_a = pom === null || pom === void 0 ? void 0 : pom.project) === null || _a === void 0 ? void 0 : _a.version;
    if (version === undefined) {
        throw Error("could not parse version from pom.xml");
    }
    return version;
};
main().then(version => {
    console.info("Successfully parsed pom.xml. Version is " + version);
    core.setOutput("version", version);
}).catch(err => {
    console.error(err);
    core.setFailed(err.message);
});
//# sourceMappingURL=index.js.map