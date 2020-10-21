document.addEventListener('DOMContentLoaded', function() {
    // Url Variables
    const notesUrl = 'http://localhost:3000/notes'
    const userUrl = 'http://localhost:3000/users'
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=9cc9fd77f608b67b46f525134c991518&units=imperial'
    const meditationUrl ='http://localhost:3000/meditations'

    // Welcome HTML Variables
    let nameForm = document.querySelector('.name-form')
    let welcomeFormDiv = document.querySelector('.welcome-form')
    let welcomeDiv = document.querySelector('.welcome')

    // Individual Meditation HTML Variables
    let container = document.querySelector('.container')

    // Time HTML Variables
    let timeOptions = document.querySelector('#time-options')
    let fiveMinBtn = document.querySelector('.fiveMinBtn')
    let tenMinBtn = document.querySelector('.tenMinBtn')
    let fifteenMinBtn = document.querySelector('.fifteenMinBtn')
    let twentyMinBtn = document.querySelector('.twentyMinBtn')

    // Weather HTML variables
    let weather = document.querySelector('#weather')
    let weatherTemp = document.querySelector('#weather-temp')
    let weatherDesc = document.querySelector('#weather-desc')
    let weatherImg = document.createElement('img')

    // Timer HTML Variables
    let timer = document.createElement('h2')
    timeOptions.appendChild(timer) 

    // notes variables
    let notesContainer = document.querySelector('#notes-container')
    let notesUl = document.querySelector('.note-list')
    let notesForm = document.createElement('form')
    let noteDateLabel = document.createElement('label')
    let noteDateInput = document.createElement('input')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let submitInput = document.createElement('input')

    //meditation list variables
    let meditations = document.querySelector('#meditations')
    let meditationUl = document.querySelector('.meditation-list')
    let meditationForm = document.createElement('form')
    let label1 = document.createElement('label')
    let label2 = document.createElement('label')
    let input1 = document.createElement('input')
    let input2 = document.createElement('input')
    let submitInput1 = document.createElement('input')
     
    // Audio
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
            getAllNotes(user)
            meditationList(user)
        }
        }))
    }

    function getAllNotes(user) {
        fetch(notesUrl)
        .then(resp => resp.json())
        .then(notes => notes.forEach(note => notesList(note, user)))
    }

    ///Create New User if Not Exist
    function postUser(e){
        e.preventDefault()

        const user ={
            name:e.target.name.value,
            email: e.target.email.value
        }

        fetch(userUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .catch (error => error.message)
    }


    function postMeditation(e, user){
        let newLi = document.createElement('li')
        newLi.textContent = `${e.target.date.value} - ${e.target.name.value}`
        meditationUl.appendChild(newLi)

        const meditation = {
            date: e.target.date.value,
            name: e.target.name.value,
            user_id: user.id
        }
        fetch(meditationUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(meditation)
        })
        .then(resp => resp.json())
        .then(data => meditationList(data))
        .catch (error => error.message)
    }

    function postNotes(e, user){
        let meditation_id
        user.meditations.forEach( meditation => {
            meditation_id = meditation.id
        })

        const note = {
            date: e.target.date.value,
            description: e.target.description.value,
            meditation_id: meditation_id
        }
        fetch(notesUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(resp => resp.json())
        .then(note => notesList(note, user))
        .catch (error => error.message)
    }

    function deleteNote(note, notesLi) {
        fetch(notesUrl + `/${note.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(() => {
            notesLi.remove()
        })
    }

    // function
    function buildUser() {
        nameForm.addEventListener('submit', (e) => {
            e.preventDefault()
            postUser(e)
            timerEventListeners()
            fetchWeather()
            getAllUsers(e)

            welcomeFormDiv.hidden = true
            container.hidden = false
            
        })
    }

    function timerEventListeners() {
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

    function notesList(note, user) {
        user.meditations.forEach( meditation => {
            if (meditation.id == note.meditation_id) {
                let editButton = document.createElement('button')
                let deleteButton = document.createElement('button')
                let noteLi = document.createElement('li')

                noteLi.className = 'notes'
                noteLi.innerText = `${note.date} -  ${note.description}`
                editButton.innerText = 'Edit Note'
                deleteButton.innerText = 'Delete Note'

                label.htmlFor = 'description'
                label.innerText = 'Description'

                noteDateLabel.htmlFor = 'date'
                noteDateLabel.innerText = 'Date'
                
                input.type = 'text'
                input.name = 'description'

                noteDateInput.type = 'text'
                noteDateInput.name = 'date'

                submitInput.type = 'submit'
                submitInput.value = "Add New Note"

                noteLi.append(editButton, deleteButton)
                notesUl.appendChild(noteLi)

                notesForm.append(noteDateLabel, noteDateInput,label, input, submitInput)
                notesContainer.appendChild(notesForm)

                // editButton.addEventListener('click', editNote(note, note.id))

                deleteButton.addEventListener('click', () => deleteNote(note, noteLi))

                notesForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    postNotes(e, user)
                })
            }
        })
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

    function buildWeather(data){
        weatherImg.className = 'weather-icon'
        weatherImg.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        weatherTemp.innerText = Math.ceil(data.main.temp) + '°F'
        weatherDesc.innerHTML=data.weather[0].description 

        weather.append(weatherImg)
    }

    function meditationList(user){
        user.meditations.forEach(meditation => {
            let editMedBtn = document.createElement('button')
            let deleteMedBtn = document.createElement('button')
            let liList = document.createElement('li')
            
            liList.textContent = `${meditation.date} - ${meditation.name}`
            editMedBtn.innerText = 'Edit'
            deleteMedBtn.innerText = 'X'  

            liList.appendChild(deleteMedBtn)
            meditationUl.appendChild(liList)
            
        })

        label1.htmlFor = 'addNewMeditationDate'
        label1.innerText = 'Date'

        label2.htmlFor = 'addNewMeditationName'
        label2.innerText = 'Name'
        
        input1.type = 'text'
        input1.name = 'date'

        input2.type = 'text'
        input2.name = 'name'

        submitInput1.type = 'submit'
        submitInput1.value = "Add New Meditation"

        meditationForm.append(label1, input1, label2, input2, submitInput1)
        meditations.append(meditationForm)
        // container.appendChild(meditations)

        meditationForm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('hi')
            postMeditation(e, user)
        })

    
    }

})