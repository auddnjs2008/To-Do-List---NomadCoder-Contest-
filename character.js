const character = document.querySelector(".you");
const ground = character.parentNode;
const writeZone = document.querySelector(".writeZone");
let x = 0;
let y = 0;
const CharacterRect = writeZone.getBoundingClientRect();
const groundRect = character.getBoundingClientRect();

const characterWhere = {
  x:
    CharacterRect.right > 0
      ? CharacterRect.right + CharacterRect.width / 2
      : CharacterRect.right - CharacterRect.width / 2,
  y: CharacterRect.bottom + CharacterRect.height / 2,
};
const groundWhere = {
  x: groundRect.right + groundRect.width / 2,
  y: groundRect.bottom + groundRect.height / 2,
};

const isContact = (player, goal) => {
  const dist = Math.floor(
    Math.sqrt(Math.pow(player.x - goal.x, 2) + Math.pow(player.y - goal.y, 2))
  );
  return dist;
};

console.log(isContact(characterWhere, groundWhere));

const handleKeydown = (e) => {
  //ArrowLeft  // ArrowRight // ArrowUp // Alt

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
    x -= 50;
  } else if (e.key === "ArrowRight" && x + 50 < xEnd) {
    character.style.left = `${where + 50}px`;
    x += 50;
  } else if (e.key === "ArrowUp" && y + 50 <= yEnd) {
    character.style.bottom = `${Jump + 50}px`;
    y += 50;
  } else if (e.key === "ArrowDown" && y - 50 > 0) {
    character.style.bottom = `${Jump - 50}px`;
    y -= 50;
  }
};

const keyManage = () => {
  window.addEventListener("keydown", handleKeydown);
};

keyManage();
