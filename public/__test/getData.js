// add library scypto-js
let C = document.createElement("script");
C.setAttribute(
  "src",
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
);
document.head.appendChild(C);

// add library axios
let A = document.createElement("script");
A.setAttribute(
  "src",
  "https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"
);
document.head.appendChild(A);

////////////////////////////////////////////////////////////////////////////////////////////////////

const getHash256 = (str) => {
  return CryptoJS.SHA256(str).toString();
};

const getHmac512 = (str, key) => {
  return CryptoJS.HmacSHA512(str, key).toString();
};

const VERSION = "1.4.11";
const URL = "https://zingmp3.vn";
const PATH_SONG = "/api/v2/song/get/streaming";
const PATH_PLAYLIST = "/api/v2/page/get/playlist";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";

const ID_PLAYLISTS = [
  {
    "id": "Z6CZO0F6",
    "name": "topNhacVpopVN"
  },
  {
    "id": "ZWZB96AW",
    "name": "topNhacDanceVN"
  },
  {
    "id": "ZWZB96AI",
    "name": "topNhacRapViet"
  },
  {
    "id": "ZWZCOZCF",
    "name": "topNhacBolero"
  },
  {
    "id": "ZWZB96CC",
    "name": "topNhacAuMy"
  },
  {
    "id": "ZWZB96EI",
    "name": "topNhacHoa"
  }
]
const playLists = {
  topNhacVpopVN: [],
  topNhacDanceVN: [],
  topNhacRapViet: [],
  topNhacBolero: [],
  topNhacAuMy: [],
  topNhacHoa: []
}

function getSong(id) {
  let CTIME = Math.floor(Date.now() / 1000);
  let signature_song = getHmac512(
    PATH_SONG + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  let song = `${URL}${PATH_SONG}?id=${id}&ctime=${CTIME}&version=1.4.11&sig=${signature_song}&apiKey=${API_KEY}`;
  return song;
}

function getList(id) {
  let CTIME = Math.floor(Date.now() / 1000);
  let signature_playlist = getHmac512(
    PATH_PLAYLIST + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
    SECRET_KEY
  );
  let topList = `${URL}${PATH_PLAYLIST}?id=${id}&ctime=${CTIME}&version=1.4.11&sig=${signature_playlist}&apiKey=${API_KEY}`;
  return topList;
}


async function getData(id_playlist, name_playlist) {
  try {
    let response = await axios.get(getList(id_playlist));
    let listS = response.data.data.song.items;
    for (let i = 0; i < listS.length; i++) {
      console.log(i); // log
      let id = i;
      let encodeId = listS[i].encodeId;
      let title = listS[i].title;
      let artistsNames = listS[i].artistsNames;
      let thumbnail = listS[i].thumbnail;
      let thumbnailM = listS[i].thumbnailM;
      let url;

      let r = await axios.get(getSong(listS[i].encodeId));
      let p = r.data.data;

      for (let key in p) {
        if (p.hasOwnProperty(key)) {
          url = p[128];
        }
      }

      playLists[name_playlist].push({
        id: id,
        encodeId: encodeId,
        title: title,
        artistsNames: artistsNames,
        thumbnail: thumbnail,
        thumbnailM: thumbnailM,
        url: url,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// download
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/*
ID_PLAYLISTS.forEach((element) => {
  getData(element.id, element.name)
})
*/

