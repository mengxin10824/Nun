var firstVideo = document.getElementById('firstVideo');
var secondVideo = document.getElementById('secondVideo');
var audioLoop = document.getElementById('audioLoop');
var audioInterval;
var countElement = document.getElementById('count');
var count = parseInt(localStorage.getItem('videoCount')) || 0;
countElement.textContent = count.toString().padStart(2, '0');
var isRotate = false;


function playAudio() {
  audioLoop.currentTime = 0;
  audioLoop.play().catch(function (error) {
    console.log('音频播放失败:', error);
  });
}

function firstVideoPlay() {
  firstVideo.currentTime = 0;
  firstVideo.play();
  firstVideo.loop = true;
  audioInterval = setInterval(playAudio, 90);
  document.getElementById("status").innerText = "正在🦌了";
}

firstVideo.addEventListener('mousedown', firstVideoPlay);
firstVideo.addEventListener('touchstart', firstVideoPlay);

function stopFirstVideo() {
  firstVideo.loop = false;
  clearInterval(audioInterval);
}
firstVideo.addEventListener('mouseup', stopFirstVideo);
firstVideo.addEventListener('touchend', stopFirstVideo);

firstVideo.addEventListener('ended', function () {
  clearInterval(audioInterval);
  count++;
  localStorage.setItem('videoCount', count);
  countElement.textContent = count.toString().padStart(2, '0');
  firstVideo.style.display = 'none';
  secondVideo.style.display = 'block';
  secondVideo.play();
  document.getElementById("status").innerText = "贤者模式！";
});

secondVideo.addEventListener('ended', function () {
  firstVideo.style.display = 'block';
  secondVideo.style.display = 'none';
  document.getElementById("status").innerText = "重新回到🦌时间！";
});

document.getElementById('menuButton').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('show');
});

if (!(/Mobi|Android|iPhone/i.test(navigator.userAgent)) || cursorChanged) {
  const cursorPointed = document.querySelector('#cursor');

  const moveCursor = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    cursorPointed.style.translate = `${mouseX}px ${mouseY}px`;
    if (isRotate) {
      cursorPointed.style.transform = `rotate(180deg) scale(5)`;
    } else {
      cursorPointed.style.transform = `none`;
    }
  }
  window.addEventListener('mousemove', moveCursor);

  const videoContainer = document.querySelector('main');
  videoContainer.addEventListener('mouseenter', () => { isRotate = true });
  videoContainer.addEventListener('mouseleave', () => { isRotate = false });
}