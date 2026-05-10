const grid = document.getElementById("grid");
const size = 10;
let total = size * size;

function init() {
    // 좌상단 빈칸
    grid.innerHTML = ''; // Clear grid if needed
    grid.appendChild(document.createElement("div"));

    // 열 헤더
    for (let c = 0; c < size; c++) {
        let header = document.createElement("div");
        header.className = "header";
        header.innerText = c + 1;
        header.onclick = () => toggleColumn(c);
        grid.appendChild(header);
    }

    // 행 + 박스 생성
    for (let r = 0; r < size; r++) {
        let rowHeader = document.createElement("div");
        rowHeader.className = "header";
        rowHeader.innerText = r + 1;
        rowHeader.onclick = () => toggleRow(r);
        grid.appendChild(rowHeader);

        for (let c = 0; c < size; c++) {
            let box = document.createElement("div");
            box.className = "box empty";
            box.dataset.row = r;
            box.dataset.col = c;
            box.innerText = (r * size) + c + 1;

            box.onclick = () => {
                box.classList.toggle("occupied");
                box.classList.toggle("empty");
                updateStats();
            };

            grid.appendChild(box);
        }
    }
    
    // 초기 테마 설정
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonText(savedTheme);
    
    updateStats();
}

function toggleRow(row) {
    document.querySelectorAll(`.box[data-row='${row}']`).forEach(box => {
        box.classList.toggle("occupied");
        box.classList.toggle("empty");
    });
    updateStats();
}

function toggleColumn(col) {
    document.querySelectorAll(`.box[data-col='${col}']`).forEach(box => {
        box.classList.toggle("occupied");
        box.classList.toggle("empty");
    });
    updateStats();
}

function updateStats() {
    let occupied = document.querySelectorAll(".occupied").length;
    let empty = total - occupied;
    let rate = ((occupied / total) * 100).toFixed(1);

    document.getElementById("occupiedCount").innerText = occupied;
    document.getElementById("emptyCount").innerText = empty;
    document.getElementById("rate").innerText = rate + "%";
}

function resetAll() {
    document.querySelectorAll(".box").forEach(box => {
        box.classList.remove("occupied");
        box.classList.add("empty");
    });
    updateStats();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
    const btn = document.getElementById('theme-btn');
    if (btn) {
        btn.innerText = theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
    }
}

// 시작
init();
