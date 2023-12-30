const table = document.querySelector("#tblBingo")
const letter = document.querySelectorAll(".letters-bingo")

const winningPositions = [ //possibilidades de ganhar horizontal e vertical
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
]

let arr = Array.apply(null, { length: 26 }).map(Number.call, Number); //criando um array de 0 a 25, o map number.call vai gerar numero de 0 a26


arr.shift() //para elimintar o primeiro n. pra nao aparecer o 0 e coloquei no console.log
shuffle(arr);

function shuffle(arr) { //para embaralhar os numeros
    let currentIndex = arr.length, randomIndex;

    while (currentIndex != 0) { //essa parte eu pedi ajuda do chatgpt xD
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

let iterator = 0;

for (i = 0; i < 5; i++) { //loop novamente ajuda do chat e adapitei
    let tr = document.createElement("tr")
    table.appendChild(tr)

    for (j = 0; j < 5; j++) {
        let td = document.createElement("td")
        td.id = arr[iterator].toString()
        td.style.height = "20%"
        td.style.width = "20%"
        td.classList.add("main-table-cell")

        let div = document.createElement("div")
        div.classList.add("cell-format")
        div.textContent = arr[iterator].toString()
        td.appendChild(div)
        tr.appendChild(td)
        iterator++;
    }
}

const cell = document.querySelectorAll(".main-table-cell");  //ajuda chat gpt
let winningIterator = 0
cell.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.add("strickout");

        if(matchWin()) { //aqui pra mostrar uma letra de cada vez, quando for true na funcao combination
            letter[winningIterator].classList.add("show-bingo");

            winningIterator++;
            if(winningIterator === 5) {
                alert('B I N G O')
                location.reload();
            }
        }
    })
})

function matchWin() {  //para cada numero selecionado, vai puxar o const para ver se ganhou
    const cell = document.querySelectorAll(".main-table-cell");

    return winningPositions.some(combination => {
        let ite = 0;
        combination.forEach(index => {
            if(cell[index].classList.contains("strickout")) ite++;
        })

        if(ite === 5) { //remove um elemento da array  para sempre dar um 1 numero na linha para acertar o bingo
            let indexWin = winningPositions.indexOf(combination);
            winningPositions.splice(indexWin, 1)
        }

        return combination.every(index => {  // se toda index for true vai ser 1
            return cell[index].classList.contains("strickout")
        })
    })
}


console.log(arr)