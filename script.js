/*========Theme Change========*/
const themeToggle = document.getElementById('theme');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else
    localStorage.setItem('theme', 'light');
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}


/*========Music Player Setup========*/
const tracks = document.querySelectorAll('.track');
const audio = new Audio();
let currentTrack = 0;

tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    currentTrack = index;
    playTrack();
  });
});

document.getElementById('play').addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    document.getElementById('play').textContent = 'Pause';
  } else {
    audio.pause();
    document.getElementById('play').textContent = 'Play';
  }
});

document.getElementById('next').addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack();
});

document.getElementById('prev').addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  playTrack();
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progress-bar').value = progress;
  document.getElementById('current-time').textContent = formatTime(audio.currentTime);
});

document.getElementById('progress-bar').addEventListener('input', () => {
  const seekTime = (document.getElementById('progress-bar').value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack();
});

document.getElementById('search').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  tracks.forEach(track => {
    const trackName = track.textContent.toLowerCase();
    if (trackName.includes(searchTerm)) {
      track.style.display = 'block';
    } else {
      track.style.display = 'none';
    }
  });
});

function playTrack() {
  const trackSrc = tracks[currentTrack].getAttribute('data-src');
  audio.src = trackSrc;
  audio.play();
  document.getElementById('play').textContent = 'Pause';
  updateTrackInfo();
}

function updateTrackInfo() {
  tracks.forEach((track, index) => {
    if (index === currentTrack) {
      track.style.backgroundColor = '#f0f0f0';
    } else {
      track.style.backgroundColor = '';
    }
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
  document.getElementById('duration').textContent = formatTime(audio.duration);
});