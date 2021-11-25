// center container vertically
document.getElementById("container").style.marginTop = `${
  (window.innerHeight - document.getElementById("container").clientHeight) / 2
}px`;

//add marginTop playlist
document.getElementById("playlist").style.marginTop = `${
  document.getElementById("container").clientHeight * 0.14
}px`;

//add height playlist
document.getElementById("playlist").style.height = `${
  document.getElementById("container").clientHeight -
  document.getElementById("container").clientHeight * 0.14
}px`;

//add marginTop top100
document.getElementById("top100").style.marginTop = `${
  document.getElementById("container").clientHeight * 0.14
}px`;

//add height top100
document.getElementById("top100").style.height = `${
  document.getElementById("container").clientHeight -
  document.getElementById("container").clientHeight * 0.14
}px`;

// toggle playlist
function playlistToggle() {
  document.querySelector("#playlist").classList.toggle("active");
  document.querySelector("#top100").classList.remove("active");
}

// toggle top100 list
function changePlayList() {
  document.querySelector("#top100").classList.toggle("active");
  document.querySelector("#playlist").classList.remove("active");
}

/*
 * Music Player
 */

const audio = document.getElementById("audio");
const slider = document.getElementById("range__slider");
const time = document.getElementById("song__time");
const btn__control = document.getElementById("btn__control");
const btn__toggle = document.getElementById("btn__toggle");
const cd__img = document.querySelector(".player__cd__img");
const playlist = document.getElementById("playlist");
const titleSong = document.querySelector(".player__control__song--title");
const artistsName = document.querySelector(
  ".player__control__song--artistsNames"
);
const prev_song = document.getElementById("btn__previous");
const next_song = document.getElementById("btn__next");
let ID_SONG_ACTIVE;

let toggleStatus = false;

class Player {
  constructor(listSongs) {
    this.listSongs = listSongs;
  }

  play(id) {
    audio.src = this.listSongs[id].url;
    this.setUI(
      this.listSongs[id].thumbnailM,
      this.listSongs[id].title,
      this.listSongs[id].artistsNames
    );
    let songInterval;
    audio.onplay = () => {
      songInterval = setInterval(() => {
        this.setPercentSLider();
        this.setTimeUI();
      }, 1000);
    };
    audio.onpause = () => {
      clearInterval(songInterval);
    };
    audio.onended = () => {
      this.nextSong();
    };
  }

  setPlay(id) {
    // remove active song previous
    if (ID_SONG_ACTIVE == undefined) {
      document.querySelector(".p__song-0").classList.toggle("active");
      document
        .querySelector(".p__song__icon--play-0")
        .classList.toggle("active");
    } else if (ID_SONG_ACTIVE == 0) {
      document.querySelector(".p__song-0").classList.toggle("active");
      document
        .querySelector(".p__song__icon--play-0")
        .classList.toggle("active");
      ID_SONG_ACTIVE = 0
    } else {
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
    }
    ID_SONG_ACTIVE = id;

    this.play(id);
    this.resumePlay();
    btn__toggle.classList.remove("bx-play");
    btn__toggle.classList.add("bx-pause");
    cd__img.classList.remove("active");
    cd__img.classList.toggle("active");
    toggleStatus = true;
    document.querySelector("#playlist").classList.toggle("active");
    document.querySelector(`.p__song-${id}`).classList.toggle("active");
    document
      .querySelector(`.p__song__icon--play-${id}`)
      .classList.toggle("active");
  }

  setUI(urlImage, title, name) {
    cd__img.src = urlImage;
    titleSong.innerHTML = title;
    artistsName.innerHTML = name;
  }

  resumePlay() {
    audio.play();
  }

  pause() {
    audio.pause();
  }

  nextSong() {
    if (document.querySelector(`.p__song-${ID_SONG_ACTIVE}`) != null) {
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
    }
    if (ID_SONG_ACTIVE == undefined) {
      ID_SONG_ACTIVE = 0;
    }
    ID_SONG_ACTIVE += 1;
    this.play(ID_SONG_ACTIVE);
    this.resumePlay();
    btn__toggle.classList.remove("bx-play");
    btn__toggle.classList.add("bx-pause");
    cd__img.classList.remove("active");
    cd__img.classList.toggle("active");
    toggleStatus = true;
    document
      .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
      .classList.toggle("active");
    document
      .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
      .classList.toggle("active");
  }

  prevSong() {
    if (document.querySelector(`.p__song-${ID_SONG_ACTIVE}`) != null) {
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
    }

    if (ID_SONG_ACTIVE == undefined) {
      ID_SONG_ACTIVE = 0;
    }

    ID_SONG_ACTIVE -= 1;

    if (ID_SONG_ACTIVE < 0) {
      ID_SONG_ACTIVE = 0;
    }
    this.play(ID_SONG_ACTIVE);
    this.resumePlay();
    btn__toggle.classList.remove("bx-play");
    btn__toggle.classList.add("bx-pause");
    cd__img.classList.remove("active");
    cd__img.classList.toggle("active");
    toggleStatus = true;
    document
      .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
      .classList.toggle("active");
    document
      .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
      .classList.toggle("active");
  }

  setPercentSLider() {
    let timePercent = (audio.currentTime / audio.duration) * 100;
    slider.value = timePercent;
    slider.style.background = `linear-gradient(90deg, #e1592e ${timePercent}%, white ${timePercent}%)`;
  }

  setPercentHandleSLider(percent) {
    slider.value = percent;
    slider.style.background = `linear-gradient(90deg, #e1592e ${percent}%, white ${percent}%)`;
    let currentTime = (audio.duration / 100) * percent;
    audio.currentTime = currentTime;
  }

  getHandleSlider(percent) {
    // console.log("change slider")
    this.setPercentHandleSLider(percent);
  }

  setTimeUI() {
    const sec = parseInt(audio.currentTime, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // console.log(minutes + ":" + seconds)
    time.innerHTML = `${minutes}:${seconds}`;
  }

  getHandleControl() {
    if (toggleStatus == false) {
      btn__toggle.classList.remove("bx-play");
      btn__toggle.classList.add("bx-pause");
      cd__img.classList.toggle("active");
      // console.log("play song")
      this.resumePlay();
      toggleStatus = true;
      // console.log(toggleStatus)
    } else {
      btn__toggle.classList.remove("bx-pause");
      btn__toggle.classList.add("bx-play");
      cd__img.classList.toggle("active");
      // console.log("pause song")
      this.pause();
      toggleStatus = false;
      // console.log(toggleStatus)
    }
  }

  renderPlaylist() {
    let playlistHtml = "";
    this.listSongs.forEach((element) => {
      playlistHtml =
        playlistHtml +
        `
          <div class="p__song-${element.id}">
            <div class="p__song__img">
              <img
                class="p__song__img--thumbnail"
                src=${element.thumbnail}
                alt="thumbnail"
              />
            </div>
            <div class="p__song__info">
              <p class="p__song__info__title">${element.title}</p>
              <p class="p__song__info__artist">${element.artistsNames}</p>
            </div>
            <div class="p__song__icon">
              <button class="p__song__icon--play-${element.id} player__btn" onclick="player.setPlay(${element.id})">
                <i class="bx bx-play"></i>
              </button>
            </div>
          </div>
      `;
    });
    playlist.innerHTML = playlistHtml;
  }
}

let player = new Player(topNhac.topNhacVpopVN);
player.renderPlaylist();
player.play(0);
document.querySelector(".p__song-0").classList.toggle("active");
document
  .querySelector(".p__song__icon--play-0")
  .classList.toggle("active");

function setPlayList(dataTopList) {
  player = new Player(dataTopList);
  player.renderPlaylist();
  player.play(0);
  player.getHandleControl();
  ID_SONG_ACTIVE = 0;
  document.querySelector(".p__song-0").classList.toggle("active");
  document.querySelector(".p__song__icon--play-0").classList.toggle("active");
  document.querySelector("#top100").classList.toggle("active");
}

// add event change on slider
slider.addEventListener("change", (e) => {
  player.getHandleSlider(e.target.value);
});

btn__control.onclick = () => {
  // console.log("click toggle")
  player.getHandleControl();
};

next_song.onclick = () => {
  player.nextSong();
};

prev_song.onclick = () => {
  player.prevSong();
};
