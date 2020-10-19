document.addEventListener('DOMContentLoaded', function() {
    // Url Variables
    const notesUrl = 'http://localhost:3000/notes'

    // Html Variables
    let form = document.querySelector('.name-form')
    let mainDiv = document.querySelector('.main')
    let div = document.querySelector('.meditation')
    let h1 = document.createElement('h1')
    let ul = document.createElement('ul')
    let li1 = document.createElement('li')
    let li2 = document.createElement('li')
    let li3 = document.createElement('li')
    let li4 = document.createElement('li')

    // notes variables
    let notesForm = document.createElement('form')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let submitInput = document.createElement('input')
    let span = document.createElement('span')
    span.className = 'notes'
    

    // call functions
    buildUser()
    
    
    // Fetch Functions
    function fetchNotes() {
        fetch(notesUrl)
        .then(resp => resp.json())
        .then(notes => notes.forEach(note => buildNotes(note)))
    }

    function postNote() {
        fetch(notesUrl)
    }


    // function
    function buildUser() {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            mainDiv.innerHTML = ''
            buildMeditation()
            fetchNotes()
        })
    }

    function buildMeditation() {
        li1.innerText = '5 min'
        li2.innerText = '10 min'
        li3.innerText = '15 min'
        li4.innerText = '20 min'
        
        label.htmlFor = 'description'
        label.innerText = 'description:'
        
        input.type = 'text'
        input.name = 'description'

        submitInput.type = 'submit'
        submitInput.value = "Create Note"

        notesForm.append(label, input, submitInput)
        // li1.addEventListener('click', countdownCounter())
        // li2.addEventListener('click', countdownCounter())
        // li3.addEventListener('click', countdownCounter())
        // li4.addEventListener('click', countdownCounter())

        h1.innerText = 'ZenVirtue'

        ul.append(li1, li2, li3, li4)

        div.appendChild(h1)
        div.appendChild(ul)
        div.appendChild(notesForm)
    }

    function buildNotes(note) {
        span.innerText = `${note.date} ${note.description}`
        div.appendChild(span)
    }



})