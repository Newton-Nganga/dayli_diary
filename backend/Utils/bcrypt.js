const x = require("bcrypt");

export function hashPass(unHashPass) {
  return x.hash(unHashPass, 10).then((hash) => hash);
}
export function isSamePass(unHashPass, hashPass) {
  return x.compare(unHashPass, hashPass).then((result) => result);
}
