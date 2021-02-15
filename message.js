const TalkBox = document.querySelector(".message");
const messageForm = document.querySelector(".messageForm");
const closeBtn = TalkBox.querySelector("button");
const messageInput = messageForm.querySelector("input[type=text]");
const messageList = document.querySelector(".messageList");

let localList = localStorage.getItem("Messages")
  ? JSON.parse(localStorage.getItem("Messages"))
  : [];

let timeInterval;
let initInterval;

const delMessage = (e) => {
  messageList.removeChild(e.target.parentNode);
  localList = localList.filter(
    (item) => item.id !== parseInt(e.target.parentNode.id)
  );

  localStorage.setItem("Messages", JSON.stringify(localList));
};

const localMessageSave = (content) => {
  localStorage.setItem(
    "Messages",

    JSON.stringify([...localList, { content, id: localList.length + 1 }])
  );
  localList = [...localList, { content, id: localList.length + 1 }];
};

const paintMessage = (content, id) => {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  delbtn.addEventListener("click", delMessage);
  delbtn.innerText = "삭제";
  li.innerText = content;
  li.id = id;
  li.appendChild(delbtn);
  messageList.appendChild(li);
};

const messageSubmit = (e) => {
  e.preventDefault();
  const content = messageInput.value;

  if (content !== "") {
    paintMessage(content, localList.length + 1);
    localMessageSave(content);
    messageInput.value = "";
  }
};

const randomMessage = () => {
  const list = JSON.parse(localStorage.getItem("Messages"));
  const Info = JSON.parse(localStorage.getItem("Profile"));
  if (list && list.length !== 0) {
    timeInterval = setInterval(() => {
      TalkBox.innerText = `${
        list[Math.floor(Math.random() * (list.length - 1 - 0))].content
      }`;
    }, 5000);
  } else {
    if (Info)
      initInterval = setInterval(() => {
        TalkBox.innerText = `Hello,${Info.name}`;
      }, 5000);
    else {
      TalkBox.innerText = "Hello Friend";
    }
  }
};

const setRandomMessage = () => {
  clearInterval(initInterval);
  clearInterval(timeInterval);
  randomMessage();
};

const setRandomMessageKey = (e) => {
  if (e.code === "Escape") {
    clearInterval(initInterval);
    clearInterval(timeInterval);
    randomMessage();
  }
};

const loadMessageList = () => {
  const loadMessages = JSON.parse(localStorage.getItem("Messages"));
  if (loadMessages !== null) {
    loadMessages.forEach((item) => paintMessage(item.content, item.id));
  }
};

const initMessageWindow = () => {
  loadMessageList();
  randomMessage();
  if (messageForm) {
    messageForm.addEventListener("submit", messageSubmit);
    window.addEventListener("keyup", setRandomMessageKey);
  }
  if (closeBtn) closeBtn.addEventListener("click", setRandomMessage);
};

initMessageWindow();
