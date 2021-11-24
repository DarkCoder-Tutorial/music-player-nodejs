const crypto = require("crypto");

const getHash256 = (a) => {
  return crypto.createHash("sha256").update(a).digest("hex");
};
const getHmac512 = (str, key) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

const ID_SONG = "ZUAU8WUW"
const ID_TOP_100 = "ZWZB969F"
const CTIME = Math.floor(Date.now() / 1000)
const VERSION = "1.4.11"
const URL = "https://zingmp3.vn"
const PATH_SONG = "/api/v2/song/get/streaming"
const PATH_TOP_100_SONG = "/api/v2/page/get/playlist"
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab"
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3"

let signature_song = getHmac512(PATH_SONG + getHash256(`ctime=${CTIME}id=${ID_SONG}version=${VERSION}`), SECRET_KEY)
let signature_top_100 = getHmac512(PATH_TOP_100_SONG + getHash256(`ctime=${CTIME}id=${ID_TOP_100}version=${VERSION}`), SECRET_KEY)

console.log(`${URL}${PATH_SONG}?id=${ID_SONG}&ctime=${CTIME}&version=1.4.11&sig=${signature_song}&apiKey=${API_KEY}`)

console.log(`${URL}${PATH_TOP_100_SONG}?id=${ID_TOP_100}&ctime=${CTIME}&version=1.4.11&sig=${signature_top_100}&apiKey=${API_KEY}`)
