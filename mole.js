let currMoleTile = null;
let currPlantTile = null;
let currGoldenMoleTile = null;
let score = 0;
let gameOver = false;
let timeLeft = 60; // 60 seconds

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        tile.addEventListener("mouseover", (e) => {
            if (e.target.tagName === "IMG") {
                e.target.style.cursor = "pointer";
            }
        });
        tile.addEventListener("mouseout", (e) => {
            e.target.style.cursor = "default";
        });
        document.getElementById("board").appendChild(tile);
    }
    setMole();
    setGoldenMole();
    setInterval(setPlant, 3000);
    setInterval(updateTime, 1000);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    
    const mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.className = "mole";
    
    let num;
    do {
        num = getRandomTile();
    } while ((currMoleTile && currMoleTile.id === num) || (currPlantTile && currPlantTile.id === num) || (currGoldenMoleTile && currGoldenMoleTile.id === num));
    
    const moleTile = document.getElementById(num);
    moleTile.appendChild(mole);
    currMoleTile = moleTile;
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    
    const plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.className = "plant";
    
    let num;
    do {
        num = getRandomTile();
    } while ((currPlantTile && currPlantTile.id === num) || (currMoleTile && currMoleTile.id === num) || (currGoldenMoleTile && currGoldenMoleTile.id === num));
    
    const plantTile = document.getElementById(num);
    plantTile.appendChild(plant);
    currPlantTile = plantTile;
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (currMoleTile === this) {
        score += 10;
        document.getElementById("score").innerText = `Time Left: ${timeLeft}, Score: ${score}`;
        currMoleTile.innerHTML = "";
        currMoleTile = null;
        setMole();
    } else if (currPlantTile === this) {
        score -= 20;
        document.getElementById("score").innerText = `Time Left: ${timeLeft}, Score: ${score}`;
        currPlantTile.innerHTML = "";
        currPlantTile = null;
    } else if (currGoldenMoleTile === this) {
        if (currGoldenMoleTile.dataset.clicks === "2") {
            score += 100;
            document.getElementById("score").innerText = `Time Left: ${timeLeft}, Score: ${score}`;
            currGoldenMoleTile.innerHTML = "";
            currGoldenMoleTile = null;
            setGoldenMole();
        } else {
            currGoldenMoleTile.dataset.clicks = "2";
        }
    }
}

function setGoldenMole() {
    if (gameOver) {
        return;
    }
    if (Math.random() < 0.001) {
        if (currGoldenMoleTile) {
            currGoldenMoleTile.innerHTML = "";
        }
        
        const goldenMole = document.createElement("img");
        goldenMole.src = "./golden-monty-mole.png";
        goldenMole.className = "golden-mole";
        goldenMole.dataset.clicks = "1";
        
        let num;
        do {
            num = getRandomTile();
        } while ((currGoldenMoleTile && currGoldenMoleTile.id === num) || (currMoleTile && currMoleTile.id === num) || (currPlantTile && currPlantTile.id === num));
        
        const goldenMoleTile = document.getElementById(num);
        goldenMoleTile.appendChild(goldenMole);
        currGoldenMoleTile = goldenMoleTile;
        setTimeout(() => {
            if (currGoldenMoleTile) {
                currGoldenMoleTile.innerHTML = "";
                currGoldenMoleTile = null;
                setGoldenMole();
            }
        }, 5000);
    }
}

function updateTime() {
    if (gameOver) {
        return;
    }
    timeLeft--;
    document.getElementById("score").innerText = `Time Left: ${timeLeft}, Score: ${score}`;
    if (timeLeft <= 0) {
        gameOver = true;
        alert(`Game Over! Your score is ${score}`);
    }
}

