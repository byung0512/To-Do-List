// 초기 할 일 데이터 (객체 배열)
let initialTodos = [
  { text: "JavaScript 공부하기", completed: false },
  { text: "과제 제출하기", completed: false }
];

// 할 일 항목(li) 하나를 생성해서 반환하는 함수
function createTodoItem(todoText, isCompleted) {
  // 1. li 요소 생성
  let li = document.createElement("li");

  // 2. 할 일 텍스트용 span 요소 생성
  let textSpan = document.createElement("span");
  textSpan.textContent = todoText;
  textSpan.classList.add("todo-text");

  if (isCompleted) {
    textSpan.classList.add("completed");
  }

  // 3. 텍스트 클릭 시 완료 상태 토글 및 개수 갱신
  textSpan.addEventListener("click", function () {
    textSpan.classList.toggle("completed");
    updateCount();
  });

  // 4. 삭제 버튼 생성
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("delete-btn");

  // 5. 삭제 버튼 클릭 시 항목 제거 및 개수 갱신
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCount();
  });

  // 6. li 안에 텍스트와 삭제 버튼 담기
  li.append(textSpan, deleteBtn);

  return li;
}

// 전체 할 일 개수와 완료된 할 일 개수를 갱신하는 함수
function updateCount() {
  let allItems = document.querySelectorAll("#todoList li");
  let completedItems = document.querySelectorAll("#todoList .completed");

  let totalCount = allItems.length;
  let completedCount = completedItems.length;

  let countEl = document.querySelector("#todoCount");
  countEl.textContent = "전체 " + totalCount + "개 / 완료 " + completedCount + "개";
}

// 새 할 일을 추가하는 함수 (기존 addTodo 기능 유지 + 확장)
function addTodo() {
  // 1. 입력값 가져오기
  let input = document.querySelector("#todoInput");
  let text = input.value.trim();

  // 2. 빈 입력 확인
  if (text === "") {
    alert("할 일을 입력하세요.");
    return;
  }

  // 3. 새로운 li 요소 생성 및 목록에 추가
  let newItem = createTodoItem(text, false);
  document.querySelector("#todoList").append(newItem);

  // 4. 입력창 초기화 및 개수 갱신
  input.value = "";
  updateCount();
}

// 페이지 처음 로드 시 초기 할 일 목록 표시
for (let i = 0; i < initialTodos.length; i++) {
  let item = createTodoItem(initialTodos[i].text, initialTodos[i].completed);
  document.querySelector("#todoList").append(item);
}
updateCount();