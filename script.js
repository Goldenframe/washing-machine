const addClothesBtn = document.getElementById("add-clothes");
const addDetergentBtn = document.getElementById("add-detergent");
const startWashBtn = document.getElementById("start-wash");
const statusText = document.getElementById("status");
const specialMessage = document.getElementById("special-message");
const circle = document.getElementById("circle");


let hasClothes = false;

let hasDetergent = false;

const addStuff = (type, textMessage, btnEl) => {
    if (type === "clothes") {
        hasClothes = !hasClothes;
    } else if (type === "detergent") {
        hasDetergent = !hasDetergent;
    }
    specialMessage.textContent = textMessage;
    btnEl.setAttribute("disabled", true);
    specialMessage.classList.remove("hidden");
    setTimeout(() => {
        specialMessage.classList.add("hidden");
        specialMessage.textContent = "";
    }, 3000);

}


const addWater = () => {
    return new Promise((resolve) => {
        statusText.innerText = "Машинка наполняется водой..."
        setTimeout(() => {
            resolve("Машика наполнилась водой.");
        }, 5000);
    })
}

const washClothes = () => {
    return new Promise((resolve, reject) => {
        statusText.innerText = "Проверяется наличие геля..."
        setTimeout(() => {
            if (hasDetergent) {
                resolve("Гель есть в машинке.")
            }
            else {
                reject("Геля в машинке нет. Стирать нечем!")
            }
        }, 5000)
    })
}

const endWash = () => {
    return new Promise((resolve, reject) => {
        statusText.innerText = "Стирка подходит к концу..."
        setTimeout(() => {
            if (hasClothes) {
                resolve("Ваши вещи постирались.")
            }
            else {
                reject("Вы забыли добавить вещи. Только потратили воду зря!")
            }
        }, 5000)
    })
}

const startWash = async () => {
    try {
        addClothesBtn.setAttribute("disabled", true);
        addDetergentBtn.setAttribute("disabled", true);
        circle.classList.add("addAnimation");
        statusText.innerText = await addWater();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const washMessage = await washClothes();
        statusText.innerText = washMessage;
        await new Promise(resolve => setTimeout(resolve, 3000));
        const endMessage = await endWash();
        statusText.innerText = endMessage;

    }
    catch (error) {
        statusText.innerText = error;

    }
    finally {
        await new Promise(resolve => setTimeout(resolve, 3000));
        statusText.innerText = "Стирка окончена.";
        circle.classList.remove("addAnimation");
        addClothesBtn.removeAttribute("disabled");
        addDetergentBtn.removeAttribute("disabled");
        hasClothes = false;
        hasDetergent = false;
        setTimeout(() => {
            statusText.innerText += `\n Начать стирку заново?`;
        }, 4000);
        await new Promise(resolve => setTimeout(resolve, 8000))
        statusText.innerText = " Статус: Ожидание действий...";
    }
}

addClothesBtn.addEventListener("click", () => { addStuff("clothes", "Одежда добавлена!", addClothesBtn) });
addDetergentBtn.addEventListener("click", () => { addStuff("detergent", "Гель добавлен!", addDetergentBtn) });
startWashBtn.addEventListener("click", startWash);
