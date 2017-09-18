"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_description_1 = require("./parse-description");
const sample1 = `People identity <a href="https://link.com">Facebook</a>.
the <code>verified</code> field`;
it("parse description", () => {
    expect(parse_description_1.default(sample1)).toBe("People identity https://link.com,Facebook. the verified field");
});
