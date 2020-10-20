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
    

    // timer variables
  
    let timer = document.createElement('h2')
    divTime.appendChild(timer)
    
    

    // notes variables
    let notesForm = document.createElement('form')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let submitInput = document.createElement('input')
    
    

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
       
        h1.innerText = 'ZenVirtue'

        divTime.append(btn1, btn2, btn3, btn4)

        div.appendChild(h1)
        div.appendChild(divTime)
        div.appendChild(notesForm)

        btn1.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 300)
        })

        btn2.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 600)
        })

        btn3.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 900)
        })

        btn4.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 1200)
        })
       

    }

    function buildNotes(note) {
        let divNotes = document.createElement('div')
        divNotes.className = 'notes'
        divNotes.innerText = `${note.date} -  ${note.description}`
        div.appendChild(divNotes)
    }


    ///build Countdown Timer
    function countDown (t){
        //t set to seconds in btn1.addEventListener
       let myTimer = setInterval(myClock, 1000)

        function myClock(){
           --t
           let seconds = t % 60 // Seconds that can't be written in min
           let minutes = (t- seconds) / 60 // Gives the seconds that COULD be given in minutes
           timer.innerHTML = `${minutes} : ${seconds}`
           if (t === 0){
               clearInterval(myTimer)
           }
       }
    }

  
   








})