// 할일을 담을 배열
let toDoList = [];

/**
 * 로컬스토리지에 할 일 값을 저장할 수 있는 함수.
 * @param {*} event 사용자의 어떤 행동이 발생하는 것
 */
let saveToDo = (event) => {
    // 할 일 입력 받는 태그를 가져옴
    let toDo = document.querySelector("#toDo");
    let alertMessage = document.querySelector(".not-null-alert");

    // 입력값이 비어 있는지 확인
    if (toDo.value.trim() === "") {
        alertMessage.innerHTML = `<p>이런! 칸이 비어 있어요!</p>`;
        alertMessage.style.color = "#d9534f"; // 경고 메시지 스타일 추가
    } else {
        // 경고 메시지 제거
        alertMessage.innerHTML = "";

        // 할 일 배열에 할 일 입력
        toDoList.push({"할일": toDo.value, "완료": false});

        // 로컬스토리지에 할 일 배열 JSON 형태로 저장
        localStorage.setItem("toDoList", JSON.stringify(toDoList));

        displayToDoList();

        // 입력 필드 비우기
        toDo.value = "";
    }
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();  // 폼 제출 기본 동작 방지
});

document.querySelector("#toDo").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        saveToDo(event);
    }
})

/**
 * 로컬스토리지에 저장된 할 일 화면에 표시하는 함수.
 */
let displayToDoList = () => {
    // 로컬스토리지에 저장된 배열을 가져옴
    let localStorageToDoList = JSON.parse(localStorage.getItem("toDoList"));

    // 혹시 모를 오류를 방지하기 위해 일단 할 일 리스트가 들어갈 자리를 초기화
    let listGroup = document.querySelector(".list-group");
    listGroup.innerHTML = "";

    // 로컬스토리지에 저장되어 있던 배열을 ul 태그 밑에 li 태그로 추가하는 코드 작성
    for (let idx = 0;idx < localStorageToDoList.length;idx++) {
        let toDo = localStorageToDoList[idx]["할일"];
        let isCompleted = localStorageToDoList[idx]["완료"];

        let newItemHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <input class="form-check-input me-1" type="checkbox" value="" id="checkbox-${idx}" ${isCompleted ? 'checked' : ''}>
                <label class="form-check-label" for="checkbox-${idx}">${toDo}</label>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm delete-btn" data-idx="${idx}">삭제</button>
        </li>
        `;

        listGroup.innerHTML += newItemHTML;
    }

    // 각 체크박스에 클릭 이벤트를 추가
    let checkboxes = document.querySelectorAll(".form-check-input");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", toggleToDoCompletion);
    })
    
    // 각 삭제 버튼에 클릭 이벤트를 추가
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteToDo);
    });

    updateProgress();
}

/**
 * 할 일을 완료/미완료로 토글하는 함수.
 * @param {*} event 체크박스 클릭 이벤트
 */
let toggleToDoCompletion = (event) => {
    let idx = event.target.id.split('-')[1];
    toDoList[idx]["완료"] = event.target.checked;

    // 로컬스토리지에 업데이트된 할 일 배열을 저장
    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    // 진행도 업데이트
    updateProgress();
}

/**
 * 삭제 버튼을 누르면 할 일을 삭제하는 함수.
 */
let deleteToDo = (event) => {
    // 삭제할 요소의 인덱스 값 가져오기
    let idx = event.target.getAttribute("data-idx");

    // 요소 1개만 삭제
    toDoList.splice(idx, 1);

    // 업데이트된 배열을 다시 저장
    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    // 화면에 업데이트 된 내용을 다시 표시
    displayToDoList();
}

/**
 * 체크된 할 일의 비율에 따라 진행도를 업데이트하는 함수.
 */
let updateProgress = () => {
    let totalTasks = toDoList.length;
    let completedTasks = toDoList.filter(item => item["완료"]).length;
    let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    let progressBar = document.querySelector("#progress-bar");
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.textContent = `${Math.round(progress)}%`;
}

// 페이지 로드 시 기존 할 일 리스트를 화면에 표시
document.addEventListener("DOMContentLoaded", () => {
    // 로컬스토리지에 있는 할 일 목록을 다시 객체 상태로 전환
    let savedToDoList = JSON.parse(localStorage.getItem("toDoList"));

    // 할 일 목록이 있으면 
    if (savedToDoList) {
        toDoList = savedToDoList;
        displayToDoList();
    }
});

let saveID = document.querySelector(".btn-outline-success");
saveID.addEventListener("click", saveToDo);