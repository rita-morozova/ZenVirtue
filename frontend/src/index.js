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

    // Container HTML Variables
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
        .catch (error => error.message)
    }

    function getAllUsers(e){
        fetch(userUrl)
        .then(resp => resp.json())
        .then (users => users.forEach(user => {if(user.name == e.target.name.value){
            getAllNotes(user)
            getAllMeditations(user)
        }
        }))
        .catch (error => error.message)
    }

    function getAllNotes(user) {
        fetch(notesUrl)
        .then(resp => resp.json())
        .then(notes => notes.forEach(note => notesList(note, user)))
        .catch (error => error.message)
    }

    function getAllMeditations(user) {
        fetch(meditationUrl)
        .then(resp => resp.json())
        .then(meditations => meditations.forEach( meditation => buildMed(meditation, user)))
        .catch (error => error.message)
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
        .then(meditation => buildMed(meditation, user))
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

    function patchNote(updatedDescription, note, user) {
        const noteData = {
            description: updatedDescription
        }
        fetch(notesUrl + `/${note.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
        .then(resp => resp.json())
        .then(data => notesList(data, user))
        .catch (error => error.message)
    }

    function patchNoteHelper(note, user) {
        let editForm = document.createElement('form')
        let editLabel = document.createElement('label')
        let editInput = document.createElement('input')
        let editSubmit = document.createElement('button')

        editLabel.htmlFor = 'description'
        editLabel.name = 'description'

        editInput.type = 'text'
        editInput.name = 'description'
        editInput.placeholder = note.description

        editSubmit.type = 'submit'
        editSubmit.innerText = 'Update Note'

        editForm.append(editLabel, editInput, editSubmit)
        notesContainer.appendChild(editForm)

        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let updatedDescription = e.target.description.value
            patchNote(updatedDescription, note, user)
            editForm.hidden = true
        })
    }

    function deleteNote(note, notesLi) {
        fetch(notesUrl + `/${note.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(() => {
            notesLi.remove()
        })
        .catch (error => error.message)
    }

    function deleteMeditation(meditation, liList) {
        fetch(meditationUrl + `/${meditation.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(() => {
            liList.remove()
            console.log('done')
        })
        .catch (error => error.message)
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

                editButton.addEventListener('click', () => patchNoteHelper(note, user))
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

    function buildMed(meditation, user) {
        user.meditations.forEach( med => {
            if (med.id == meditation.id) {
                let editMedBtn = document.createElement('button')
                let deleteMedBtn = document.createElement('button')
                let liList = document.createElement('li')
                
                liList.textContent = `${meditation.date} - ${meditation.name}`
                editMedBtn.innerText = 'Edit'
                deleteMedBtn.innerText = 'X'  

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

                liList.appendChild(deleteMedBtn)
                meditationUl.appendChild(liList)

                meditationForm.append(label1, input1, label2, input2, submitInput1)
                meditations.append(meditationForm)
                // container.appendChild(meditations)

                deleteMedBtn.addEventListener('click', () => deleteMeditation(meditation, liList))

                meditationForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    postMeditation(e, user)
                })
            }
        })
    }

})