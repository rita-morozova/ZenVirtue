document.addEventListener('DOMContentLoaded', function() {
    // Url Variables
    const notesUrl = 'http://localhost:3000/notes'
    const userUrl = 'http://localhost:3000/users'
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=9cc9fd77f608b67b46f525134c991518&units=imperial'
    const meditationUrl ='http://localhost:3000/meditations'

    // Main Html Variables
    let body = document.querySelector('body')

    // Welcome HTML Variables
    let nameForm = document.querySelector('.name-form')
    let welcomeFormDiv = document.querySelector('.welcome-form')
    let welcomeDiv = document.querySelector('.welcome')

    // Individual Meditation HTML Variables
    let individualMed = document.querySelector('.individualMed')

    // Time HTML Variables
    let timeOptions = document.querySelector('#time-options')
    let fiveMinBtn = document.querySelector('.fiveMinBtn')
    let tenMinBtn = document.querySelector('.tenMinBtn')
    let fifteenMinBtn = document.querySelector('.fifteenMinBtn')
    let twentyMinBtn = document.querySelector('.twentyMinBtn')

    // Weather HTML variables
    let weatherTemp = document.querySelector('#weather-temp')
    let weatherDesc = document.querySelector('#weather-desc')

    // Timer HTML Variables
    let timer = document.createElement('h2')
    timeOptions.appendChild(timer) 

    // notes variables
    let notesForm = document.createElement('form')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let submitInput = document.createElement('input')

    // Audio Variables
    let audioUrl = 'https://audionautix.com/Music/RunningWaters.mp3'
    let audio1 = new Audio(audioUrl)

    // Event listener
    window.setTimeout(() => {
        welcomeDiv.hidden = true
        welcomeFormDiv.hidden = false
    }, 2000)

    // call functions
    buildUser()
      
    // Fetch Functions
    function fetchWeather(){
        fetch(weatherUrl)
        .then(resp => resp.json())
        .then(data => buildWeather(data))
    }

    function getAllUsers(e){
        fetch(userUrl)
        .then(resp => resp.json())
        .then (users => users.forEach(user => {if(user.name == e.target.name.value){
            buildNotes(user)
            buildMeditationList(user)
        }
        }))
    }

    // Functions
    function buildUser() {
        nameForm.addEventListener('submit', (e) => {
            e.preventDefault()
            welcomeFormDiv.hidden = true
            individualMed.hidden = false
            fetchWeather()
            getAllUsers(e)
            buildMeditation(e)
        })
    }

    function buildMeditation(user) {
        label.htmlFor = 'description'
        label.innerText = 'description:'
        
        input.type = 'text'
        input.name = 'description'

        submitInput.type = 'submit'
        submitInput.value = "Create Note"


        notesForm.append(label, input, submitInput)

        notesForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            postNotes(e, user)
        })

        individualMed.appendChild(timeOptions)
        individualMed.appendChild(notesForm)
        
        fiveMinBtn.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 300)
            audio1.play()
        })

        tenMinBtn.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 600)
        })

        fifteenMinBtn.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 900)
        })

        twentyMinBtn.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 1200)
        })
       

    }

    function buildNotes(user) {
        user.notes.forEach(note => {
            let editButton = document.createElement('button')
            let deleteButton = document.createElement('button')
            let divNotes = document.createElement('div')
            divNotes.className = 'notes'
            divNotes.innerText = `${note.date} -  ${note.description}`
            editButton.innerText = 'Edit Note'
            deleteButton.innerText = 'Delete Note'
            divNotes.append(editButton, deleteButton)
            individualMed.appendChild(divNotes)
            // editButton.addEventListener('click', editNote(note, note.id))
        })
    }

    function buildMeditationList(user){       
        user.meditations.forEach(meditation => {
            let divMeditations = document.createElement('div')
            divMeditations.className = 'user-meditations-list'
            divMeditations.innerText = `${meditation.name}`
            body.appendChild(divMeditations)
        })
    }

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

    function buildWeather(data){
        weatherTemp.innerText = data.main.temp
        weatherDesc.innerHTML=data.weather[0].description 
    }

})