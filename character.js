const character = document.querySelector(".you");
const ground = character.parentNode;
const writeZone = document.querySelector(".writeZone");
const outZone = document.querySelector(".outDoor");
const form = document.querySelector(".todoForm");
const formClose = form.querySelector("button");
const icons = document.querySelectorAll("i");
const sliderWrapper = document.querySelector(".sliderWrapper");

let x = 0;
let y = 0;

const writeRect = writeZone.getBoundingClientRect();
const groundRect = ground.getBoundingClientRect();
const outRect = outZone.getBoundingClientRect();
const leftRect = icons[0].getBoundingClientRect();
const rightRect = icons[1].getBoundingClientRect();

const outWhere = {
  x: outRect.right - outRect.width / 2,
  y: outRect.bottom - outRect.height / 2,
};
const writeWhere = {
  x: writeRect.right - writeRect.width / 2,
  y: writeRect.bottom - writeRect.height / 2,
};

const leftButtonWhere = {
  x: leftRect.right - leftRect.width / 2,
  y: leftRect.bottom - leftRect.height / 2,
};

const rightButtonWhere = {
  x: rightRect.right - rightRect.width / 2,
  y: rightRect.bottom - rightRect.height / 2,
};

const isContact = (player, goal) => {
  const dist = Math.floor(
    Math.sqrt(Math.pow(player.x - goal.x, 2) + Math.pow(player.y - goal.y, 2))
  );
  return dist;
};

const showForm = (e) => {
  if (e.code === "Space") {
    form.style.display = "block";
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
    if (icons[0].style.backgroundColor === "yellow") {
      leftSliderBtn();
    } else {
      rightSliderBtn();
    }
  }
};

const handleKeydown = (e) => {
  //ArrowLeft  // ArrowRight // ArrowUp // Alt
  console.log(e.key);

  e.preventDefault();

  const yEnd = ground.offsetHeight;
  const xEnd = ground.offsetWidth;

  const {
    style: { left, bottom },
  } = character;

  let where = parseInt(left.split("px"));
  let Jump = parseInt(bottom.split("px"));
  if (e.key === "ArrowLeft" && x - 50 >= 0) {
    character.style.left = `${where - 50}px`;
    //character.style.transform = "rotateY(90deg)";
    x -= 50;
  } else if (e.key === "ArrowRight" && x + 50 < xEnd) {
    character.style.left = `${where + 50}px`;
    //character.style.transform = "rotateY(90deg)";

    x += 50;
  } else if (e.key === "ArrowUp" && y + 50 <= yEnd) {
    character.style.bottom = `${Jump + 50}px`;
    //character.style.transform = "rotateX(-50deg)";

    y += 50;
  } else if (e.key === "ArrowDown" && y - 50 > 0) {
    character.style.bottom = `${Jump - 50}px`;
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
        : CharacterRect.right + CharacterRect.width / 2,
    y: CharacterRect.bottom - CharacterRect.height / 2,
  };

  if (isContact(characterWhere, writeWhere) < 100) {
    writeZone.style.backgroundColor = "yellow";
    window.addEventListener("keydown", showForm);
    return;
  } else {
    writeZone.style.backgroundColor = "";
    form.style.display = "none";
    window.removeEventListener("keydown", showForm);
  }

  if (isContact(characterWhere, outWhere) < 100) {
    outZone.style.backgroundColor = "yellow";

    return;
  } else {
    outZone.style.backgroundColor = "";
  }

  if (isContact(characterWhere, leftButtonWhere) < 30) {
    icons[0].style.backgroundColor = "yellow";
    window.addEventListener("keydown", sliderHandler);
    return;
  } else {
    icons[0].style.backgroundColor = "";
    window.removeEventListener("keydown", sliderHandler);
  }

  if (isContact(characterWhere, rightButtonWhere) < 30) {
    icons[1].style.backgroundColor = "yellow";
    window.addEventListener("keydown", sliderHandler);
    return;
  } else {
    icons[1].style.backgroundColor = "";
    window.removeEventListener("keydown", sliderHandler);
  }
};

const handleOutForm = () => {
  window.addEventListener("keydown", handleKeydown);
  form.style.display = "none";
};

const keyManage = () => {
  if (localStorage.getItem("Profile")) {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyUp);
  }
  if (formClose) formClose.addEventListener("click", handleOutForm);
};

exports = keyManage;
