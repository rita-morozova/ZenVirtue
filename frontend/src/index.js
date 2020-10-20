document.addEventListener('DOMContentLoaded', function() {
    // Url Variables
    const notesUrl = 'http://localhost:3000/notes'
    const userUrl = 'http://localhost:3000/user'

    // Html Variables
    let form = document.querySelector('.name-form')
    let mainDiv = document.querySelector('.main')
    let div = document.querySelector('.meditation')
    let h1 = document.createElement('h1')
    let divTime = document.createElement('div')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')
    let btn3 = document.createElement('button')
    let btn4 = document.createElement('button')
    let h2 = document.createElement('h2')

    // timer variables
  
    let timer = document.createElement('h2')
    divTime.appendChild(timer)
    
    
    


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

    function fetchUser(id) {
        fetch('http://localhost:3000/users/' + `${id}`)
        .then(resp => resp.json())
        .then(console.log)
    }

    // function postNote() {
    //     fetch(notesUrl)
    // }



    // function
    function buildUser() {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            mainDiv.innerHTML = ''
            buildMeditation()
            fetchNotes()
            fetchUser()
        })
    }

    function buildMeditation() {
        divTime.className = 'time-options'
        btn1.setAttribute('data-time', 300)
        btn2.setAttribute('data-time', 600)
        btn3.setAttribute('data-time', 900)
        btn4.setAttribute('data-time', 1200)
        btn1.innerText = '5 min'
        btn2.innerText = '10 min'
        btn3.innerText = '15 min'
        btn4.innerText = '20 min'
       

        
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

        divTime.append(btn1, btn2, btn3, btn4)

        div.appendChild(h1)
        div.appendChild(divTime)
        div.appendChild(notesForm)

    
      

    }

    function buildNotes(note) {
        span.innerText = `${note.date} ${note.description}`
        div.appendChild(span)
    }

  





})