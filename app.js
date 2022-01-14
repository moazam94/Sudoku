const gameBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submission = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    gameBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log(submission)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]   
        })
        solutionDisplay.innerHTML = 'This is the answer'
    } else {
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}

const solve = () => {
    joinValues()
    const data = submission.join('')
    console.log('data', data)
    
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': '2aeeaa1344msh1339f723e481df9p111be3jsnc1b685c1c60b'
        },
        data: {
            puzzle: data
        }
    }

    axios.request(options).then((response) => {
	    console.log(response.data)
        populateValues(response.data.solvable, response.data.solution)
    }).catch((error) => {
	    console.error(error);
    })
}

solveButton.addEventListener('click', solve)
