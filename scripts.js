document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.getElementById("terminal");
    const output = document.getElementById("output");
    const commandInput = document.getElementById("command");

    let username = localStorage.getItem("username") || "guest"; // Store username persistently
    let isMatrixActive = false; // Added missing variable declaration
    commandInput.focus();

    displayAsciiLogo(); // Show ASCII logo at start

    commandInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = commandInput.value.trim();
            processCommand(command);
            commandInput.value = "";
        }
    });

    function processCommand(command) {
        const response = document.createElement("p");
        response.innerHTML = `<span class="prompt">${username}@portfolio:~$</span> ${command}`;
        output.appendChild(response);

        const args = command.split(" "); // Splitting for potential multi-word commands

        switch (args[0]) {
            case "help":
                printResponse(`
                    <div>
                        <strong>Available commands:</strong><br>
                        - <span class="cmd">about</span>: Learn more about me.<br>
                        - <span class="cmd">projects</span>: View my projects.<br>
                        - <span class="cmd">contact</span>: Get in touch.<br>
                        - <span class="cmd">skills</span>: See my skills.<br>
                        - <span class="cmd">theme</span>: Toggle dark/light mode.<br>
                        - <span class="cmd">matrix</span>: Enter the Matrix mode.<br>
                        - <span class="cmd">setname [your name]</span>: Change terminal username.<br>
                        - <span class="cmd">clear</span>: Clear the terminal.<br>
                    </div>
                `);
                break;
            case "about":
                printResponse("Hi! I'm a front-end developer who loves interactive websites and also a cyber security analyst who enjoys hacking.");
                break;
            case "projects":
                printResponse(`
                    <div>
                        <strong>Here are my projects:</strong><br>
                        - <a href="https://midnightsou.github.io/calculator/" target="_blank">Calculator Web App</a><br>
                        - <a href="https://midnightsou.github.io/quiz_app/" target="_blank">Quiz Web App</a><br>
                        - <a href="https://midnightsou.github.io/note-app/" target="_blank">Note Web App</a><br>
                        - <a href="https://github.com/Midnightsou/tic-tac-toe" target="_blank">Tic Tac Toe</a><br>
                    </div>
                `);
                break;
            case "contact":
                printResponse(`
                    <div>
                        <strong>Contact me at:</strong><br>
                        - 📧 Email: <a href="mailto:mukhtaradedapoemiola@gmail.com">mukhtaradedapoemiola@gmail.com</a><br>
                        - 🔗 GitHub: <a href="https://github.com/midnightsou" target="_blank">midnightsou</a><br>
                        - 🔗 Twitter: <a href="https://X.com/bug_buste" target="_blank">bug_buster</a>
                    </div>
                `);
                break;
            case "skills":
                printResponse(`
                    <div>
                        <strong>My Skills:</strong><br>
                        - 🚀 Front-end: HTML, CSS, JavaScript,<br>
                        - 🔐 Cybersecurity: Ethical Hacking, Encryption, CTF Challenges<br>
                        - 🖥️ Other: vulnerability testing, Bash, Linux, Networking
                    </div>
                `);
                break;
            case "setname":
                if (args.length > 1) {
                    const newName = args.slice(1).join(" "); // Allow multi-word usernames
                    username = newName;
                    localStorage.setItem("username", newName);
                    printResponse(`Username changed to <strong>${newName}</strong>`);
                } else {
                    printResponse("Usage: setname [your name]");
                }
                break;
            case "theme":
                document.body.classList.toggle("light-theme");
                printResponse("Theme toggled! Try again.");
                break;
            case "matrix":
                toggleMatrixMode();
                break;
            case "clear":
                output.innerHTML = "";
                break;
            default:
                printResponse(`Command not found. Type <span class="cmd">help</span> for a list of commands.`);
                break;
        }

        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the latest output
    }

    function printResponse(htmlContent) {
        const responseContainer = document.createElement("div");
        output.appendChild(responseContainer);

        let index = 0;
        function typeText() {
            responseContainer.innerHTML = htmlContent.slice(0, index + 1);
            index++;
            if (index < htmlContent.length) {
                setTimeout(typeText, 10);
            }
        }

        typeText();
    }

    function toggleMatrixMode() {
        if (!isMatrixActive) {
            isMatrixActive = true;
            document.body.classList.add("matrix-mode");

            const matrixCanvas = document.createElement("canvas");
            matrixCanvas.id = "matrixCanvas";
            document.body.appendChild(matrixCanvas);
            startMatrixEffect();

            printResponse("Entering the Matrix... Type 'matrix' again to exit.");
        } else {
            isMatrixActive = false;
            document.body.classList.remove("matrix-mode");
            const matrixCanvas = document.getElementById("matrixCanvas");
            if (matrixCanvas) {
                matrixCanvas.remove();
            }
            printResponse("Exiting the Matrix...");
        }
    }

    function startMatrixEffect() {
        const canvas = document.getElementById("matrixCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / 20);
        const drops = new Array(columns).fill(0);

        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0";
            ctx.font = "20px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(33 + Math.random() * 94);
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);
    }

    function displayAsciiLogo() {
        const asciiArt = `
        ███╗   ███╗██╗██████╗ ███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗    
        ████╗ ████║██║██╔══██╗████╗  ██║██║██╔═══██╗██║  ██║╚══██╔══╝    
        ██╔████╔██║██║██████╔╝██╔██╗ ██║██║██║   ██║███████║   ██║       
        ██║╚██╔╝██║██║██╔═══╝ ██║╚██╗██║██║██║   ██║██╔══██║   ██║       
        ██║ ╚═╝ ██║██║██║     ██║ ╚████║██║╚██████╔╝██║  ██║   ██║       
        ╚═╝     ╚═╝╚═╝╚═╝     ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝       
        `;
        console.log(asciiArt); 
        printResponse(`<pre>${asciiArt}</pre>`);
    }
});