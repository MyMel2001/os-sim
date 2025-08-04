            // Application management
let applications = [];

function openApplication(appType) {
    // Prevent multiple instances of the same app
    if (applications.some(app => app.type === appType)) {
        alert(`An instance of ${appType} is already running.`);
        return;
    }

    // Create application window
    const windowContainer = document.getElementById('application-container');
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    
    // Window header with close button
    const header = document.createElement('div');
    header.className = 'window-header';
    
    const title = document.createElement('span');
    title.textContent = appType.charAt(0).toUpperCase() + appType.slice(1);
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '✖';
    closeBtn.onclick = () => closeWindow(windowElement);
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    windowElement.appendChild(header);
    
    // Add drag functionality to the window header
    let isDragging = false;
    let offsetX, offsetY;

    header.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
    };

    document.onmousemove = (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    };

    document.onmouseup = () => {
        isDragging = false;
    };
    
    // Window content based on application type
    const content = document.createElement('div');
    content.className = 'window-content';
    
    switch (appType) {
        case 'file-explorer':
            content.innerHTML = `
                <ul id="file-tree">
                    <li>Documents
                        <ul>
                            <li>Work</li>
                            <li>Personal</li>
                        </ul>
                    </li>
                    <li>Pictures</li>
                    <li>Downloads</li>
                </ul>
            `;
            break;
        case 'notepad':
            content.innerHTML = `
                <textarea style="width: 100%; height: 100%; resize: none;"></textarea>
            `;
            break;
        case 'calculator':
            content.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                    <button onclick="calculate('7')">7</button>
                    <button onclick="calculate('8')">8</button>
                    <button onclick="calculate('9')">9</button>
                    <button onclick="calculate('/')">÷</button>
                    <button onclick="calculate('4')">4</button>
                    <button onclick="calculate('5')">5</button>
                    <button onclick="calculate('6')">6</button>
                    <button onclick="calculate('*')">×</button>
                    <button onclick="calculate('1')">1</button>
                    <button onclick="calculate('2')">2</button>
                    <button onclick="calculate('3')">3</button>
                    <button onclick="calculate('-')">−</button>
                    <button onclick="calculate('0')">0</button>
                    <button onclick="calculate('.')">.</button>
                    <button onclick="calculate('=')">=</button>
                    <button onclick="calculate('+')">+</button>
                </div>
                <input type="text" id="calc-display" readonly style="width: 100%; margin-top: 10px; text-align: right;">
            `;
            break;
    }
    
    windowElement.appendChild(content);
    windowContainer.appendChild(windowElement);
    applications.push({ type: appType, element: windowElement });
}

function closeWindow(windowElement) {
    const index = applications.findIndex(app => app.element === windowElement);
    if (index !== -1) {
        applications.splice(index, 1);
        windowElement.remove();
    }
}

// System clock
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    document.getElementById('system-clock').textContent = timeStr;
}
setInterval(updateClock, 1000);

// Calculator functionality
window.calculate = function(value) {
    const display = document.getElementById('calc-display');
    if (value === '=') {
        try {
            display.value = evaluateExpression(display.value);
        } catch {
            display.value = 'Error';
        }
    } else {
        display.value += value;
    }
};

function evaluateExpression(expr) {
    // Simple evaluation that only allows numbers and basic operators
    // This is a basic example; for production, use a proper math parser
    return Function('"use strict";return (' + expr + ')')();
}
