const startModal = document.querySelector(".startWindow");
const startForm = startModal.querySelector("form");
const nameInput = startForm.querySelector("input[type=text]");
const checkBoxes = startForm.querySelectorAll("input[type=checkbox]");
let check = null;

const startSubmit = (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const character = check ? check.value : "🏂";

  // 로컬에 사용자정보 저장해준다.
  localStorage.setItem("Profile", JSON.stringify({ name, character }));
  nameInput.value = "";
  startModal.style.display = "none";
  keyManage();
};

const handleCheckBox = (e) => {
  checkBoxes.forEach((item) => (item.checked = false));
  e.target.checked = true;
  check = e.target;
};

const start = () => {
  if (startForm) startForm.addEventListener("submit", startSubmit);
  checkBoxes.forEach((item) => item.addEventListener("click", handleCheckBox));
};

if (!localStorage.getItem("Profile")) {
  start();
} else {
  startModal.style.display = "none";
  keyManage();
}
