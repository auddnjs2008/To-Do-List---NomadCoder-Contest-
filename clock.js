const clock = document.querySelector(".clock");
const backGround = document.querySelector(".backWall");

const timer = () => {
  const Time = new Date();
  const Year = Time.getFullYear();
  const Month = Time.getMonth() + 1;
  const Day = Time.getDate();
  const Hour = Time.getHours();
  const Minute = Time.getMinutes();
  const Seconds = Time.getSeconds();

  backgroundChange(Hour);
  const FullDate = `${Year}-${Month < 10 ? `0${Month}` : Month}-${
    Day < 10 ? `0${Day}` : Day
  }`;
  const timerContent = `${Hour < 10 ? `0${Hour}` : Hour} : ${
    Minute < 10 ? `0${Minute}` : Minute
  } : ${Seconds < 10 ? `0${Seconds}` : Seconds} `;

  clock.innerHTML = `<div>${FullDate}</div>`;
  clock.innerHTML += `<div>${timerContent}</div>`;
};

const backgroundChange = (hour) => {
  if (hour > 7 && hour < 17) {
    // 해가 떠있을 때
    backGround.style.backgroundImage =
      "url('https://usecloud.s3-ap-northeast-1.amazonaws.com/TodoList/%EB%82%AE.jpg')";
  } else if (hour >= 17 && hour < 20) {
    // 해가 내려갈때
    backGround.style.backgroundImage =
      "url('https://usecloud.s3-ap-northeast-1.amazonaws.com/TodoList/%ED%95%B4%EC%A7%88%EB%85%98.jpg')";
  } else {
    // 해가 져있을 때
    backGround.style.backgroundImage =
      "url('https://usecloud.s3-ap-northeast-1.amazonaws.com/TodoList/%EB%B0%A4.jpg')";
  }

  if (backGround.classList.contains("nightMode")) {
    backGround.style.backgroundImage =
      "url('https://usecloud.s3-ap-northeast-1.amazonaws.com/TodoList/%EB%B0%A4.jpg')";
  }
};

setInterval(() => timer(), 1000);
