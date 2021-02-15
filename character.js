const character = document.querySelector(".you");
const message = document.querySelector(".message");
const ground = character.parentNode;
const writeZone = document.querySelector(".writeZone");
const outZone = document.querySelector(".outDoor");
const form = document.querySelector(".todoForm");
const messageSettingWindow = document.querySelector(".messageWrapper");
const messageClose = messageSettingWindow.querySelector("button");
const formClose = form.querySelector("button");
const icons = document.querySelectorAll("i");
const sliderWrapper = document.querySelector(".sliderWrapper");

const leftWall = document.querySelector(".leftWall");
const rightWall = document.querySelector(".rightWall");
const backWall = document.querySelector(".backWall");

let x = 500;
let y = 50;

let writeRect = writeZone.getBoundingClientRect();
let groundRect = ground.getBoundingClientRect();
let outRect = outZone.getBoundingClientRect();
let leftRect = icons[0].getBoundingClientRect();
let rightRect = icons[1].getBoundingClientRect();
let messageBoxRect = icons[2].getBoundingClientRect();

let outWhere = {
  x: window.scrollX + outRect.right - outRect.width / 2,
  y: outRect.bottom - outRect.height / 2,
};
let writeWhere = {
  x: window.scrollX + writeRect.right - writeRect.width / 2,
  y: writeRect.bottom - writeRect.height / 2,
};

let leftButtonWhere = {
  x: window.scrollX + leftRect.right - leftRect.width / 2,
  y: leftRect.bottom - leftRect.height / 2,
};

let rightButtonWhere = {
  x: window.scrollX + rightRect.right - rightRect.width / 2,
  y: rightRect.bottom - rightRect.height / 2,
};

let messageBoxWhere = {
  x: window.scrollX + messageBoxRect.right - messageBoxRect.width / 2,
  y: messageBoxRect.bottom - messageBoxRect.height / 2,
};

const isContact = (player, goal) => {
  const dist = Math.floor(
    Math.sqrt(Math.pow(player.x - goal.x, 2) + Math.pow(player.y - goal.y, 2))
  );
  return dist;
};

const showForm = (e) => {
  if (e.code === "Space") {
    form.style.display = "flex";
    window.removeEventListener("keydown", handleKeydown);
  }
};

const leftSliderBtn = () => {
  if (sliderWrapper.scrollLeft !== 0) {
    sliderWrapper.scrollLeft -= sliderWrapper.clientWidth;
  }
};

const rightSliderBtn = () => {
  if (sliderWrapper.scrollLeft < sliderWrapper.clientWidth * 2) {
    sliderWrapper.scrollLeft += sliderWrapper.clientWidth;
  }
};

const sliderHandler = (e) => {
  if (e.code === "Space") {
    if (icons[0].style.color === "rgb(255, 221, 89)") {
      leftSliderBtn();
    } else {
      rightSliderBtn();
    }
  }
};

const settingMessage = (e) => {
  if (e.code === "Space") {
    window.removeEventListener("keydown", handleKeydown);
    messageSettingWindow.style.display = "flex";
  }
};

const nightMode = (e) => {
  const { innerHTML: text } = outZone;
  if (e.code === "Space") {
    leftWall.classList.toggle("nightMode");
    rightWall.classList.toggle("nightMode");
    backWall.classList.toggle("nightMode");
    document.body.classList.toggle("nightMode");
    if (text.includes("켜기")) {
      outZone.innerHTML = "DarkMode 끄기";
    } else {
      outZone.innerHTML = "DarkMode 켜기";
    }
  }
};

const handleKeydown = (e) => {
  //ArrowLeft  // ArrowRight // ArrowUp // Alt
  e.preventDefault();

  const yEnd = ground.offsetHeight;
  const xEnd = ground.offsetWidth;

  const {
    style: { left, bottom },
  } = character;

  const {
    style: { left: messageLeft, bottom: messageBottom },
  } = message;

  let where = parseInt(left.split("px")[0]);
  let Jump = parseInt(bottom.split("px")[0]);

  let messageWhere = parseInt(messageLeft.split("px")[0]);
  let messageJump = parseInt(messageBottom.split("px")[0]);

  if (e.key === "ArrowLeft" && x - 50 >= 0) {
    character.style.left = `${where - 50}px`;
    message.style.left = `${messageWhere - 50}px`;
    //character.style.transform = "rotateY(90deg)";
    x -= 50;
  } else if (e.key === "ArrowRight" && x + 50 < xEnd) {
    character.style.left = `${where + 50}px`;
    message.style.left = `${messageWhere + 50}px`;
    //character.style.transform = "rotateY(90deg)";

    x += 50;
  } else if (e.key === "ArrowUp" && y + 50 <= yEnd) {
    character.style.bottom = `${Jump + 50}px`;
    message.style.bottom = `${messageJump + 50}px`;
    //character.style.transform = "rotateX(-50deg)";

    y += 50;
  } else if (e.key === "ArrowDown" && y - 50 > 0) {
    character.style.bottom = `${Jump - 50}px`;
    message.style.bottom = `${messageJump - 50}px`;
    //character.style.transform = "rotateX(-50deg)";
    y -= 50;
  }
};

const handleKeyUp = (e) => {
  const CharacterRect = character.getBoundingClientRect();
  const characterWhere = {
    x:
      CharacterRect.right > 0
        ? CharacterRect.right - CharacterRect.width / 2
        : window.scrollX + CharacterRect.right + CharacterRect.width / 2,
    y: CharacterRect.bottom - CharacterRect.height / 2,
  };

  if (isContact(characterWhere, writeWhere) < 100) {
    writeZone.style.color = "#ffdd59";
    window.addEventListener("keydown", showForm);
    return;
  } else {
    writeZone.style.color = "";
    form.style.display = "none";
    window.removeEventListener("keydown", showForm);
  }

  if (isContact(characterWhere, outWhere) < 100) {
    outZone.style.color = "#ffdd59";
    window.addEventListener("keydown", nightMode);
    return;
  } else {
    window.removeEventListener("keydown", nightMode);
    outZone.style.color = "";
  }

  if (isContact(characterWhere, leftButtonWhere) < 30) {
    icons[0].style.color = "#ffdd59";
    window.addEventListener("keydown", sliderHandler);
    return;
  } else {
    icons[0].style.color = "";
    window.removeEventListener("keydown", sliderHandler);
  }

  if (isContact(characterWhere, rightButtonWhere) < 30) {
    icons[1].style.color = "#ffdd59";
    window.addEventListener("keydown", sliderHandler);
    return;
  } else {
    icons[1].style.color = "";
    window.removeEventListener("keydown", sliderHandler);
  }

  if (isContact(characterWhere, messageBoxWhere) < 100) {
    icons[2].style.color = "#ffdd59";
    window.addEventListener("keydown", settingMessage);
    return;
  } else {
    icons[2].style.color = "";
    messageSettingWindow.style.display = "none";
    window.removeEventListener("keydown", settingMessage);
  }
};

const handleOutForm = (e) => {
  e.preventDefault();
  window.addEventListener("keydown", handleKeydown);
  form.style.display = "none";
};

const handleOutmessageForm = (e) => {
  e.preventDefault();
  window.addEventListener("keydown", handleKeydown);
  messageSettingWindow.style.display = "none";
};

const handleResize = (e) => {
  writeRect = writeZone.getBoundingClientRect();
  groundRect = ground.getBoundingClientRect();
  outRect = outZone.getBoundingClientRect();
  leftRect = icons[0].getBoundingClientRect();
  rightRect = icons[1].getBoundingClientRect();

  outWhere = {
    x: window.scrollX + outRect.right - outRect.width / 2,
    y: outRect.bottom - outRect.height / 2,
  };
  writeWhere = {
    x: window.scrollX + writeRect.right - writeRect.width / 2,
    y: writeRect.bottom - writeRect.height / 2,
  };

  leftButtonWhere = {
    x: window.scrollX + leftRect.right - leftRect.width / 2,
    y: leftRect.bottom - leftRect.height / 2,
  };

  rightButtonWhere = {
    x: window.scrollX + rightRect.right - rightRect.width / 2,
    y: rightRect.bottom - rightRect.height / 2,
  };
  messageBoxWhere = {
    x: window.scrollX + messageBoxRect.right - messageBoxRect.width / 2,
    y: messageBoxRect.bottom - messageBoxRect.height / 2,
  };
};

const initHandleKey = (e) => {
  if (e.code === "Escape") {
    form.style.display = "none";
    messageSettingWindow.style.display = "none";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    window.addEventListener("keydown", handleKeydown);
  } else if (e.code === "ArrowRight") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } else if (e.code === "ArrowDown") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
};

const keyManage = () => {
  if (localStorage.getItem("Profile")) {
    character.innerText = JSON.parse(localStorage.getItem("Profile")).character;

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keyup", initHandleKey);
  }
  if (formClose) formClose.addEventListener("click", handleOutForm);
  if (messageClose)
    messageClose.addEventListener("click", handleOutmessageForm);
};

keyManage();
