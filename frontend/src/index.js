document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let form = document.querySelector('.name-form')
    let mainDiv = document.querySelector('.main')
    let div = document.querySelector('.meditation')
    let h1 = document.createElement('h1')
    let ul = document.createElement('ul')
    let li1 = document.createElement('li')
    let li2 = document.createElement('li')
    let li3 = document.createElement('li')
    let li4 = document.createElement('li')
    let counterH1 = document.createElement('h1')
    counterH1.innerText  = 0

    // call functions
    buildUser()
    
    // Counter
    const intervalCounter = () => counterH1.innerText++
    const intervalHandler = window.setInterval(intervalCounter, 1000)

    // function
    function buildUser() {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            mainDiv.innerHTML = ''
            buildMeditation()
        })
    }

    function buildMeditation() {
        li1.innerText = '5 min'
        li2.innerText = '10 min'
        li3.innerText = '15 min'
        li4.innerText = '20 min'

        counterH1.className = 'counter'
        li1.addEventListener('click', countdownCounter())
        li2.addEventListener('click', countdownCounter())
        li3.addEventListener('click', countdownCounter())
        li4.addEventListener('click', countdownCounter())

        h1.innerText = 'Name of Page'

        ul.append(li1, li2, li3, li4)

        div.appendChild(counterH1)
        div.appendChild(h1)
        div.appendChild(ul)
    }

    function countdownCounter(duration, display) {
        let timer = duration

    }

})