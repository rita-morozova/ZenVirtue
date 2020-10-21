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
    let weather = document.querySelector('#weather')
    let weatherTemp = document.querySelector('#weather-temp')
    let weatherDesc = document.querySelector('#weather-desc')
    let weatherImg = document.createElement('img')

    // Timer HTML Variables
    let timer = document.createElement('h2')
    timeOptions.appendChild(timer) 

    // notes variables
    let notesForm = document.createElement('form')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let submitInput = document.createElement('input')

    //meditation list variables
    let listDiv = document.createElement('div')
    let ulList = document.createElement('ul')
    let h2List = document.createElement('h2')
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
            buildNotes(user)
            meditationList(user)
        }
        }))
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
        ulList.appendChild(newLi)

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

    // function postNotes(e, user){
    //    console.log(e, user)
    //     fetch(notesUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({description: e.target[0].value, })
    //     })
    //     .then(resp => resp.json())
    //     .then(console.log)
    // }



    



    



   




    // /////////////////////////

    // // function
    function buildUser() {
        nameForm.addEventListener('submit', (e) => {
            e.preventDefault()
            postUser(e)
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


    
    // function buildMeditationList(user){       
    //     user.meditations.forEach(meditation => {
    //         let divMeditations = document.createElement('div')
    //         divMeditations.className = 'user-meditations-list'
    //         divMeditations.innerText = `${meditation.name}`
    //         individualMed.appendChild(divMeditations)
    //     })
    // }

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
            ulList.appendChild(liList)
            liList.textContent = `${meditation.date} - ${meditation.name}`
            editMedBtn.innerText = 'Edit'
            liList.appendChild(deleteMedBtn)
            deleteMedBtn.innerText = 'X'
           
           
        })
        
        listDiv.className = 'meditation-list'
        h2List.textContent = "My Meditations"

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
        individualMed.appendChild(listDiv)
        listDiv.append(h2List, ulList, meditationForm)

        meditationForm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('hi')
            postMeditation(e, user)
        })

    
    }

})