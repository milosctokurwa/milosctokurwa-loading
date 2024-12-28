var videoIds;
var Config = {};
var videoId = Config.videoId;
var pedaljebanypiesczarny = document.createElement("script");
pedaljebanypiesczarny.src = "https://www.youtube.com/iframe_api";
var GramNaSkryptach = document.getElementsByTagName("script")[0];
GramNaSkryptach.parentNode.insertBefore(pedaljebanypiesczarny, GramNaSkryptach);
var GownoCoZmieniaszGlosnosc1 = document.querySelector("#audio");
var muted = false;
var player;
var videoIds = [
    "QJNUa6Nh94k", 
    "40g99-I5GQE",
    "f5b3dvINScs",
    "x7z4lKIJkzs",
    "XaZnsfHXHhY",
    "5WZEGVNp3GI",
    "kLqx6QT9G6w",
    "OrKoVXPoftg",
    "HUGDdrFrYVg",
    "Pa_JVWvO0F4",
    "6sj7odDvKsw",
    "i_yftYJVD38",
    "HLNP35-V2A4",
    "pbM_miYBfIw", 
    "h8A5TxQsVp4"
]; 

function onYouTubeIframeAPIReady() {
    var randomIndex = Math.floor(Math.random() * videoIds.length);
    var videoId = videoIds[randomIndex];
    var apiKey = "AIzaSyAeIshuYudEVctNr3BY-A2yB7xQoeNFxp0";
    var apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    var nazwanutki = document.querySelector(".song-name");
  
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            var videoTitle = data.items[0].snippet.title;
            if (videoTitle.length > 20) {
                videoTitle = videoTitle.substring(0, 28) + "...";
            }
            nazwanutki.innerHTML = videoTitle;
        }
    })

    player = new YT.Player("PedalskiFilmik", {
        videoId: videoId,
        playerVars: {
            "playlist": videoId,
            "autoplay": 1,
            "controls": 0,
            "disablekb": 1,
            "enablejsapi": 1,
            "loop": 1,
            "vq": "highres"
        },
        events: {
            "onReady": function (event) {
                onStart(event);
            },
        }
    });
}

function onStart(event) {
    event.target.setVolume(10);
    event.target.playVideo();
}

document.querySelector("#audio").addEventListener("click", function() {
    if (muted) {
        player.unMute();
        muted = false;
        document.querySelector("#audio").classList.remove("fa-volume-mute");
        document.querySelector("#audio").classList.add("fa-volume-high");
        $('#audio').css({'color':`#874cff`})
        $('#zmienkolor').css({'fill':`#874cff`})

        $('#procenty').css({'filter':`drop-shadow(0 0 1vh #874cff)`})
        $('#procenty').css({'color':`#874cff`})
        $('.line').css({'background':`#874cff`})
        $('.icon i').css({'filter':`drop-shadow(0 0 1vh #874cff)`})
        $('.tiktok i').css({'filter':`drop-shadow(0 0 1vh #874cff)`}).css({'color':`#874cff`})
        $('.indrop i').css({'filter':`drop-shadow(0 0 1vh #874cff)`}).css({'color':`#874cff`})
        $('#zmienanicku').css({'filter':`drop-shadow(0 0 1vh #874cff)`})
        $('#zmienanicku').css({'color':`#874cff`})

        localStorage.setItem('muted', "false");
    } else {
        player.mute();
        localStorage.setItem('muted', "true");
        muted = true;

        $('#zmienanicku').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`})
        $('#zmienanicku').css({'color':`#FF4C4C`})
        $('#procenty').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`})
        $('#procenty').css({'color':`#FF4C4C`})
        $('.line').css({'background':`#FF4C4C`})
        $('.icon i').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`})
        $('.tiktok i').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`}).css({'color':`#FF4C4C`})
        $('.indrop i').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`}).css({'color':`#FF4C4C`})

        document.querySelector("#audio").classList.remove("fa-volume-high");
        document.querySelector("#audio").classList.add("fa-volume-mute");
    }
});

window.addEventListener("message", function (e) {
    if (localStorage.getItem('muted') == "true") {
        $('#audio').css({'color': `#ff4c4c`});
        $('#zmienkolor').css({'fill': `#ff4c4c`});
        $('#procenty').css({'filter':`drop-shadow(0 0 1vh #FF4C4C)`})
        $('#procenty').css({'color':`#FF4C4C`})
        $('.line').css({'background': `#ff4c4c`});
        $('.icon i').css({'filter': `drop-shadow(0 0 1vh #ff4c4c)`});
        $('.tiktok i').css({'filter': `drop-shadow(0 0 1vh #ff4c4c)`}).css({'color': `#ff4c4c`});
        $('.indrop i').css({'filter': `drop-shadow(0 0 1vh #ff4c4c)`}).css({'color': `#ff4c4c`});
        $('#zmienanicku').css({'filter': `drop-shadow(0 0 1vh #ff4c4c)`}).css({'color': `#ff4c4c`});
        document.querySelector("#audio").classList.remove("fa-volume-high");
        document.querySelector("#audio").classList.add("fa-volume-mute");

        if (player && typeof player.mute === "function") {
            player.mute();
        }
    } else {
        document.querySelector("#audio").classList.remove("fa-volume-mute");
        document.querySelector("#audio").classList.add("fa-volume-high");
        $('#audio').css({'color': `#874cff`});
        $('#zmienkolor').css({'fill': `#874cff`});
        $('#procenty').css({'filter':`drop-shadow(0 0 1vh #874cff)`})
        $('#procenty').css({'color':`#874cff`})
        $('.line').css({'background': `#874cff`});
        $('.icon i').css({'filter': `drop-shadow(0 0 1vh #874cff)`});
        $('.tiktok i').css({'filter': `drop-shadow(0 0 1vh #874cff)`}).css({'color': `#874cff`});
        $('.indrop i').css({'filter': `drop-shadow(0 0 1vh #874cff)`}).css({'color': `#874cff`});
        $('#zmienanicku').css({'filter': `drop-shadow(0 0 1vh #874cff)`}).css({'color': `#874cff`});

        if (player && typeof player.unMute === "function") {
            player.unMute();
        }
    }

    if (e.data.eventName === "loadProgress") {
        document.querySelector('#zmienanicku').innerText = window.nuiHandoverData.name;
        document.querySelector("#procenty").textContent = parseInt(e.data.loadFraction * 100) + "%";
    }
});
