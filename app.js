const playerContainer = document.querySelector('.player-container');
const sound = playerContainer.querySelector(".sound");
const timeDisplay = playerContainer.querySelector(".time-display");
const playBtn = playerContainer.querySelector(".play-btn");
const playIcon = playBtn.querySelector(".play-icon");
const video = document.querySelector(".video");
let duration = 600;

const animation = () => {
	// Get length of outline circle
	const outline = playBtn.querySelector(".moving-outline circle"); // Select circle, because you want to animate the path of a svg
	const outlineLength = outline.getTotalLength();

	outline.style.strokeDasharray = outlineLength; // Defining the gaps between the path (no gaps)
	outline.style.strokeDashoffset = outlineLength; // Defining the start point of the path

	// When the sound is playing, this will be constantly executed
	sound.ontimeupdate = () => {
		let currentTime = sound.currentTime;
		let remainingTime = duration - currentTime;
		let seconds = Math.floor(remainingTime % 60); // When the seconds gets to 60, it's going to reset to 0 again
		let minutes = Math.floor(remainingTime / 60);

		// Animate the circle
		let progress = outlineLength - (currentTime / duration) * outlineLength;
		outline.style.strokeDashoffset = progress;

		// Update the time display
		timeDisplay.textContent = `${minutes}:${seconds}`;

		// If the time is over, reset 
		if (currentTime >= duration) {
			reset();
		}
	}	
}

const reset = () => {
	sound.pause();
	sound.currentTime = 0;
	video.pause();
	playIcon.src = './svgs/play.svg';
}

const playOrPauseSound = () => {
	// Play or pause the sound
	if (sound.paused) {
		sound.play();
		video.play();
		playIcon.src = './svgs/pause.svg';
	} else {
		sound.pause();
		video.pause();
		playIcon.src = './svgs/play.svg';
	}
}

const selectDuration = () => {
	const timeBtns = document.querySelectorAll(".time-btn-container .time-btn");

	timeBtns.forEach(option => {
		option.addEventListener('click', () => {
			duration = option.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
		})
	})
}

const changeSound = () => {
	const soundContainer = document.querySelector('.sound-container')
	const soundBtns = soundContainer.querySelectorAll(".sound-btn");
	const soundName = playerContainer.querySelector('.sound-name');

	soundBtns.forEach(option => {
		option.addEventListener('click', () => {
			sound.src = option.getAttribute('data-sound');
			video.src = option.getAttribute('data-video');
			soundName.textContent = option.textContent;
			reset();
			playOrPauseSound();
		})
	});
}

const app = () => {
	animation();
	playBtn.addEventListener('click', () => {
		playOrPauseSound();
	});
	selectDuration();
	changeSound();
}

app();