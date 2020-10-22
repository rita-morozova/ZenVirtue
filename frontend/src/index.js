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

    //Quotes variables
    let randomQuote = document.querySelector('#random-quote')
    let quoteDiv = document.createElement('div')
    let quoteh2 = document.createElement('h2')
    let quotesArray = ["The secret of getting ahead is getting started.", "The best time to plant a tree was 20 years ago. The second best time is now.", "If people are doubting how far you can go, go so far that you can’t hear them anymore.", 'Your limitation—it’s only your imagination.',  'Push yourself, because no one else is going to do it for you.', 'Sometimes later becomes never. Do it now.', ' Great things never come from comfort zones.', 'Dream it. Wish it. Do it.', 'Success doesn’t just find you. You have to go out and get it.', 'The harder you work for something, the greater you’ll feel when you achieve it.', 'Dream bigger. Do bigger.', 'Don’t stop when you’re tired. Stop when you’re done.', 'Wake up with determination. Go to bed with satisfaction.', 'Do something today that your future self will thank you for.', 'Little things make big days.', 'It’s going to be hard, but hard does not mean impossible.', ' Don’t wait for opportunity. Create it.', 'Sometimes we’re tested not to show our weaknesses, but to discover our strengths.', 'The key to success is to focus on goals, not obstacles.', 'Dream it. Believe it. Build it.']
    let quoteBtn = document.querySelector('#getquotes')
    quoteBtn.addEventListener('click', () => loadQuotes())


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

    function getAllMeditations(user) {
        fetch(meditationUrl)
        .then(resp => resp.json())
        .then(meditations => meditations.forEach(meditation => meditationList(meditation, user)))
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
        .then(data=> meditationList(data))
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

    function deleteMeditation(meditation) {
        fetch(meditationUrl + `/${meditation.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(() => {
           let deleteLi = document.querySelector('.button-delete-meditation')
           deleteLi.parentNode.remove()
        })
    }

    function patchMeditation(e, meditation){
        // let editedLi = document.createElement('li')
        // editedLi.textContent = `${e.target.date.value} - ${e.target.name.value}`
        // meditationUl.appendChild(editedLi)
      
        const meditationPatched = {
            date: e.target.date.value,
            name: e.target.name.value
        }
        fetch(meditationUrl + `/${meditation.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(meditationPatched)
        })
        .then(resp => resp.json())
        .then(data => buildUser(data))
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

        let badWeatherArray = ['clouds', 'rain', 'snow', 'thunderstorm', 'drizzle', 'fog', 'mist']
        let checkAgainst = data.weather[0].description.split(' ')
        let result = badWeatherArray.some(r => checkAgainst.includes(r))
        console.log(result)
        // if (result == true){
        //     play cheerful music 
        // }else{
        //     play rain 
        // }
    }

    function meditationList(user){
        user.meditations.forEach(meditation => {
            let editMedBtn = document.createElement('button')
            let deleteMedBtn = document.createElement('button')
            let liList = document.createElement('li')

            deleteMedBtn.className ='button-delete-meditation'
            editMedBtn.className = 'button-edit-meditation'
            
            liList.className ='user-meditations'
            liList.textContent = `${meditation.date} - ${meditation.name}`
            editMedBtn.innerText = 'Edit'
            deleteMedBtn.innerText = 'X'  

            liList.append(editMedBtn, deleteMedBtn)
            meditationUl.appendChild(liList)

            deleteMedBtn.addEventListener('click', () => deleteMeditation(meditation))
            editMedBtn.addEventListener('click', () => {
                editMeditationEntry(meditation)
            })
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
            postMeditation(e, meditation)
        })
    }

    function editMeditationEntry(user){
        let divEditMed = document.createElement('div')
        divEditMed.getElementsByClassName = 'edit-meditation'
        meditations.appendChild(divEditMed)

        let meditationEditForm = document.createElement('form')
        let editLabel = document.createElement('label')
        let editLabel1 = document.createElement('label')
        let editInput = document.createElement('input')
        let editInput1 = document.createElement('input')
        let submitEditInput = document.createElement('input')

        divEditMed.append(meditationEditForm)
        meditationEditForm.append(editLabel, editInput, editLabel1, editInput1, submitEditInput)

        editLabel.htmlFor = 'editNewMeditationDate'
        editLabel.innerText = 'Date'

        editLabel1.htmlFor = 'editNewMeditationName'
        editLabel1.innerText = 'Name'
        
        editInput.type = 'text'
        editInput.name = 'date'

        editInput1.type = 'text'
        editInput1.name = 'name'

        submitEditInput.type = 'submit'
        submitEditInput.value = "Edit"

        meditationEditForm.addEventListener('submit', (e) => {
            console.log('hi')
            e.preventDefault()
            patchMeditation(e, user)
        })
    }

    function loadQuotes(){
        quoteDiv.className = 'quote-div'
        randomQuote.append(quoteDiv)
        quoteDiv.append(quoteh2)
       

        for(i =0; i< quotesArray.length; i++){
            let newQuote =quotesArray[Math.floor(Math.random() * quotesArray.length)]
            quoteh2.innerText = newQuote
        }
    }

    



})