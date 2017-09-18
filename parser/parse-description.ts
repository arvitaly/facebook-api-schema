export default (desc: string) => {
    return desc
    .replace(/<a\s[^<>]*href\s*=\s*"(.*)"[^<>]*>(.*)<\/a>/gi, "\$1,\$2")
    .replace(/<[A-z]+[^<>]*>(.*)<\/[A-z]+>/gi, "\$1")
    .replace("\n", " ")
    ;
};
