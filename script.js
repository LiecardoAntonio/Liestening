const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];


// Web Audio API -> Next, you'll learn about the Web Audio API and how to use it to play songs. All modern browsers support the Web Audio API, which lets you generate and process audio in web applications.

const audio = new Audio(); //Use const to create a variable named audio and set it equal to new Audio(). This will create a new HTML5 audio element.
// console.log(audio);

//Your music player should keep track of the songs, the current song playing, and the time of the current song. To do this, you will need to create an object to store this information.
let userData = {
  songs : [...allSongs], //Since users will be able to shuffle and delete songs from the playlist, you will need to create a copy of the allSongs array without mutating the original. This is where the spread operator comes in handy.
  currentSong : null,
  songCurrentTime: 0
};

console.log(userData.songs);

//learn arrow function
// const printGreeting = () => {
//   console.log("Hello there!");
// }

// const printMessage = (org) => {
//   console.log(`${org} is awesome!`);
// };
// printMessage("freeCodeCamp");

// const addTwoNumbers = (num1, num2) => {
//   return num1 + num2;
// };

// //if we just return a simple expression we can do i t like this:
// const multiplyNum = (num1, num2) => num1*num2;
// console.log(addTwoNumbers(3,4));
// console.log(multiplyNum(3,4));

//play a spesific song (use find method to get spesific song)
const playSong = (id) => {
  const song = userData?.songs.find((song) => id===song.id); //return the song that has the same id, otherwise return undefined
  //Inside the playSong function, set the audio.src property equal to song.src. This tells the audio element where to find the audio data for the selected song. Also, set the audio.title property equal to song.title. This tells the audio element what to display as the title of the song.  
  audio.src = song.src;
  audio.title = song.title;

  //Before playing the song, you need to make sure it starts from the beginning. This can be achieved by the use of the currentTime property on the audio object. Add an if statement to check whether the userData?.currentSong is falsy OR if userData?.currentSong.id is strictly not equal song.id. This condition will check if no current song is playing or if the current song is different from the one that is about to be played. Inside if block, set the currentTime property of the audio object to 0.
  if(!userData?.currentSong || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0; //set to 0 (so it starts from 0 sec when it plays the new song)
  } else {
    audio.currentTime = userData?.songCurrentTime; //Add an else block to handle the song's current playback time. This allows you to resume the current song at the point where it was paused.
  }

  userData.currentSong = song; //You should not use the optional chaining operator ?. in this step because userData.currentSong will not be null or undefined at this point.

  playButton.classList.add("playing");
  highlightCurrentSong(); //highlight the currently playing song
  setPlayerDisplay(); //set the currently playing song to the display
  audio.play(); //To finally play the song, use the play() method on the audio variable. play() is a method from the web audio API for playing an mp3 file.
};

// add functional to the playbutton to be able to play the song
playButton.addEventListener('click', () => {
  if(!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

//function to pause the current playing song
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  //Use classList and remove() method to remove the .playing class from the playButton, since the song will be paused at this point. To finally pause the song, use the pause() method on the audio variable. pause() is a method of the Web Audio API for pausing music files.
  playButton.classList.remove("playing");
  audio.pause(); 
};

//add pausing functional to the pauseButton
pauseButton.addEventListener('click', pauseSong)

//function for next and prev song
//Before you start working on playing the next and previous song, you need to get the index of each song in the songs property of userData.
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong); //an arrow function that return the index of the currently playing song.

const playNextSong = () => {
  if(userData?.currentSong === null) { //This will check if there's no current song playing in the userData object.
    playSong(userData?.songs[0].id); //if no currently playing song then play the first song.
  } else {
    //else, then play the next song
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex+1];
    playSong(nextSong.id);
  }
}

nextButton.addEventListener('click', playNextSong);

//function to play prev song
const playPreviousSong = () => {
  if(userData?.currentSong === null) return; //if no song playing currently
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex-1];
    playSong(previousSong.id);
  }
};
previousButton.addEventListener("click", playPreviousSong);

//function to shuffle the order of the song
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5); //One way to randomize an array of items would be to subtract 0.5 from Math.random() which produces random values that are either positive or negative. This makes the comparison result a mix of positive and negative values, leading to a random ordering of elements.
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs); //pass it ro the render function
  //call the function needed just like the playSong function
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};
shuffleButton.addEventListener('click', shuffle);

//function to delete a song
const deleteSong = (id) => {
  //make sure its not playing before deleting it
  if(userData?.currentSong?.id===id){
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();//pause the song
    setPlayerDisplay();
  };

  userData.songs = userData?.songs.filter((song) => song.id!==id); //if the id is the same then we filter it out(remove it)
  renderSongs(userData?.songs); //pass it back to render after deleted
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  //check if the playlist is empty. If it is, you should reset the userData object to its original state.
  if(userData?.songs.length === 0){
    const resetButton = document.createElement("button"); //if the playlist is empty, you need to create a resetButton element and a text for it. This button will only show up if the playlist is empty.
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    //You need to add the resetText to the resetButton element as a child, and also the resetButton to the playlistSongs element as a child. For this, there is an appendChild() method to use.
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton); 

    //add event to the resetButton
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs()); 
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  };
};

//Display the current song title and artist in the player display
const setPlayerDisplay = () => {
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  // setting the text content based by the current title & artist
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

//highlight the currently playing song
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
  if(songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

// The only issue now is that the next song does not automatically play when the currently playing song ends. To fix that, you can set up an event listener which will detect when the currently playing song ends. The "ended" event listener is appropriate for this. It is fired when the playback of a media reaches the end. Add an event listener to the audio element which listens for the "ended" event. Pass in a callback using arrow syntax with empty curly braces.
audio.addEventListener('ended', () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists  = userData.songs.length-1 > currentSongIndex ? true : false;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;  
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

const renderSongs = (array) => {
  const songsHTML = array.map((song) => { ////array.map function takes another function as its parameter
    //To play the song anytime the user clicks on it, add an onclick attribute to the first button element. Inside the onclick, call the playSong function with song.id.
    return `
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
          </svg>
      </button>
      </li>
    `;
  }).join("");
  playlistSongs.innerHTML = songsHTML;
};

//to make the playButton shows the song
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0]; //get the currently playing song or the first song in the playlist.
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}`: "Play") ; //set aria-label attribute with the respective value based on the condition
};


const sortSongs = () => {
  userData?.songs.sort((a,b) => { //To sort the songs in alphabetical order by title, you will need to pass in a compare callback function into your sort() method.
    if (a.title < b.title) {
      //In this example, the first condition (a.name < b.name) checks if the name of the first fruit is less than the name of the second fruit. If so, the first fruit is sorted before the second fruit.
      return -1; //The reason why this example is returning numbers is because the sort() method is expecting a number to be returned. If you return a negative number, the first item is sorted before the second item.
    } else if(a.title > b.title) {
      return 1; //The second condition in this example checks if a.name > b.name. If so, the function returns 1, which sorts the first fruit after the second fruit.
    } 
    return 0; //In the example, if a.name is equal to b.name, then the function returns 0. This means that nothing changes and the order of a and b remains the same.
  }); 
  return userData?.songs; // return the data after sorted
};


// call the function to render all the songs
// 1.
//renderSongs(userData?.songs); //use optional chaining so it won't throws error when there is a problem while renderring all the songs.

// 2.
renderSongs(sortSongs());
setPlayButtonAccessibleText();



