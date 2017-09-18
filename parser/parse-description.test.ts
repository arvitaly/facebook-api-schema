import parseDescription from "./parse-description";
const sample1 = `People identity <a href="https://link.com">Facebook</a>.
the <code>verified</code> field`;
it("parse description", () => {
    expect(parseDescription(sample1)).toBe("People identity https://link.com,Facebook. the verified field");
});
