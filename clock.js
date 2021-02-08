const clock = document.querySelector(".clock");

const timer = () => {
  const Time = new Date();
  const Year = Time.getFullYear();
  const Month = Time.getMonth() + 1;
  const Day = Time.getDate();
  const Hour = Time.getHours();
  const Minute = Time.getMinutes();
  const Seconds = Time.getSeconds();

  const FullDate = `${Year}-${Month < 10 ? `0${Month}` : Month}-${
    Day < 10 ? `0${Day}` : Day
  }`;
  const timerContent = `${Hour < 10 ? `0${Hour}` : Hour} : ${
    Minute < 10 ? `0${Minute}` : Minute
  } : ${Seconds < 10 ? `0${Seconds}` : Seconds} `;

  clock.innerHTML = `<div>${FullDate}</div>`;
  clock.innerHTML += `<div>${timerContent}</div>`;
};

setInterval(() => timer(), 1000);
