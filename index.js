const app = () => {

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector('.replay');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //timeSelect
    const timeSelect = document.querySelectorAll('.time-select button')

    //time display
    const timeDisplay = document.querySelector('.time-display');

    //get the lenght of the outline
    const outlinelength = outline.getTotalLength();

    //duration
    let fakeDuration = 600;

    //circular loading bar
    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset = outlinelength;

    //slect the sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            isPlaying(song);
        })
    })

    //play sound
    play.addEventListener('click', () => {
        isPlaying(song);

    });




    // const restartSong = song => {
    //     let currentTime = song.currentTime;
    //     song.currentTime = 0;
    //     // console.log("ciao")

    // }
    // replay.addEventListener('click', () => {
    //     restartSong(song);

    // });


    //Select the timer
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`
        })
    });





    //stop and play the sound
    const isPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }

    };

    //animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //animate the circle bar
        let progress = outlinelength - (currentTime / fakeDuration) * outlinelength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }


}

app()