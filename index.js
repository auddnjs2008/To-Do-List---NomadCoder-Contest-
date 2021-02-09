const Form = document.querySelector(".todoForm");
const input = document.querySelector("input");
const toDoList = document.querySelector(".todoList");
const finishList = document.querySelector(".finishList");

const delList = (e) => {
  const {
    currentTarget: {
      parentNode: { id },
    },
  } = e;
  const type = e.currentTarget.id;
  if (type === "MyList") {
    toDoList.removeChild(e.currentTarget.parentNode);
  } else {
    finishList.removeChild(e.currentTarget.parentNode);
  }
  localDelList(parseInt(id), type);
};

const localDelList = (id, type) => {
  let localList = JSON.parse(localStorage.getItem(type));
  localList = localList.filter((item) => parseInt(item.id) !== id);
  localStorage.setItem(type, JSON.stringify(localList));
};

const finishClick = (e) => {
  //finishClick, backClick, delClick
  const {
    currentTarget: {
      parentNode: { id, innerText },
      previousSibling,
    },
  } = e;
  // 먼저 투두리스트에서 삭제
  previousSibling.id = "finishList";
  const newList = { content: innerText.split("삭제")[0], id };
  localDelList(parseInt(id), "MyList");
  toDoList.removeChild(e.currentTarget.parentNode);
  // finishList에 그려준다.  -- paint사용(내용,타입)
  paintList(newList, "finishList");
  // finishlocal에 저장해준다.
  localStore(newList, "finishList");
};

const backClick = (e) => {
  const {
    currentTarget: { parentNode, previousSibling },
  } = e;
  e.currentTarget.innerText = "마침";
  previousSibling.id = "MyList";
  const { id, innerText } = parentNode;
  finishList.removeChild(parentNode);
  paintList({ content: innerText.split("삭제")[0], id }, "MyList");
  localDelList(parseInt(parentNode.id), "finishList");
  localStore(
    { content: innerText.split("삭제")[0], id: parseInt(id) },
    "MyList"
  );
};

const paintList = (list, type) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.id = type;
  delBtn.addEventListener("click", delList);
  if (type === "MyList") {
    const finishBtn = document.createElement("button");
    finishBtn.addEventListener("click", finishClick);
    finishBtn.innerText = "마침";
    li.innerText = list.content;
    li.id = list.id;
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    toDoList.prepend(li);
  } else {
    const backBtn = document.createElement("button");
    backBtn.innerText = "되돌리기";
    backBtn.addEventListener("click", backClick);
    li.innerText = list.content;
    li.id = list.id;
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    finishList.prepend(li);
  }
};

const localStore = (list, type) => {
  // type이  MyList이면  MyList에   finishList이면  finishList에 저장해준다.
  let localArray =
    localStorage.getItem(type) && JSON.parse(localStorage.getItem(type)).length
      ? JSON.parse(localStorage.getItem(type))
      : [];
  localStorage.setItem(type, JSON.stringify([...localArray, list]));
};

const startPainter = (type) => {
  const localArray = JSON.parse(localStorage.getItem(type));
  if (localArray && localArray.length)
    localArray.forEach((item) => paintList(item, type));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newList = input.value;
  const newId = Date.now();
  const newData = { content: newList, id: newId };
  if (newList !== "") {
    // 프론트에 그려줘야 한다.
    paintList(newData, "MyList");
    //로컬에도 저장해줘야 한다.
    localStore(newData, "MyList");
  }
  input.value = "";
};

const init = () => {
  startPainter("MyList");
  startPainter("finishList");
  Form.addEventListener("submit", handleSubmit);
};

init();
