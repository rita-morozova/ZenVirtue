document.addEventListener('DOMContentLoaded', function() {
    // Url Variables
    const notesUrl = 'http://localhost:3000/notes'
    const userUrl = 'http://localhost:3000/users'
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=9cc9fd77f608b67b46f525134c991518&units=imperial'
    const meditationUrl ='http://localhost:3000/meditations'

    // Html Variables
    let body = document.querySelector('body')
    let form = document.querySelector('.name-form')
    let mainDiv = document.querySelector('.main')
    let div = document.querySelector('.meditation')
    let h1 = document.createElement('h1')
    let divTime = document.createElement('div')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')
    let btn3 = document.createElement('button')
    let btn4 = document.createElement('button')

    // weather variables
    let divWeather = document.createElement('div')
    let h1Weather = document.createElement('h1')
    let weatherDesc = document.createElement('h2')
    let weatherImg = document.createElement('img')   
  
    

    // timer variables
    let timer = document.createElement('h2')
    divTime.appendChild(timer) 

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
    let input1 = document.createElement('input')
    let submitInput1 = document.createElement('input')
   

   

    // Audio
    let audioUrl = 'https://audionautix.com/Music/RunningWaters.mp3'
    let audio1 = new Audio(audioUrl)

    // call functions
    buildUser()
   
       
    // // Fetch Functions

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



    



    // function fetchNotes() {
    //     fetch(notesUrl)
    //     .then(resp => resp.json())
    //     .then(notes => notes.forEach(note => buildNotes(note)))
    // }

    
    



   

    // // function fetchUser(id) {
    // //     fetch('http://localhost:3000/users/' + `${id}`)
    // //     .then(resp => resp.json())
    // //     .then(console.log)
    // //     .catch()
    // // }

    // // function postUser(name, email) {
    // //     userData = {
    // //         name: name,
    // //         email: email
    // //     }

    // //     configObj = {
    // //         method: 'POST',
    // //         headers: {
    // //             'Content-Type': 'application/json',
    // //             'Accept': 'application/json'
    // //         },
    // //         body: JSON.stringify(userData)
    // //     }

    // //     fetch(userUrl)
    // // }

   

    // function editNote(note, noteId) {
    //     noteData = {
    //         description: note.description
    //     }

    //     configObj = {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(noteData)
    //     }

    //     fetch(notesUrl + `/${noteId}`, configObj)
    //     .then(resp => resp.json())
    //     .then(note => buildNotes(note))
    // }

    // /////////////////////////

    // // function
    function buildUser() {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            postUser(e)
            mainDiv.innerHTML = ''
            fetchWeather()
            getAllUsers(e)
            buildMeditation(e)
        })
    }

    function buildMeditation(user) {
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

        notesForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            postNotes(e, user)
        })

       
        h1.innerText = 'ZenVirtue'

        divTime.append(btn1, btn2, btn3, btn4)

        div.appendChild(h1)
        div.appendChild(divTime)
        div.appendChild(notesForm)
        
        btn1.addEventListener('click', (e) => {
            e.preventDefault()
            countDown(t = 300)
            audio1.play()
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
        div.appendChild(divNotes)


        // editButton.addEventListener('click', editNote(note, note.id))
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
        divWeather.className ='weather'
        h1Weather.innerHTML = data.main.temp
        div.appendChild(divWeather)
        divWeather.append(h1Weather, weatherDesc, weatherImg)
        weatherImg.className = 'weather-icon'
        h1Weather.innerHTML = Math.ceil(data.main.temp) + '°F'
        weatherDesc.innerHTML=data.weather[0].description
        weatherImg.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        
    }

    function meditationList(user){
        user.meditations.forEach(meditation => {
            let editMedBtn = document.createElement('button')
            let deleteMedBtn = document.createElement('button')
            let liList = document.createElement('li')
            ulList.appendChild(liList)
            liList.textContent = `${meditation.date} - ${meditation.name}`
            liList.appendChild(editMedBtn)
            editMedBtn.innerText = 'Edit'
            liList.appendChild(deleteMedBtn)
            deleteMedBtn.innerText = 'X'
           
           
        })
        body.appendChild(listDiv)
        listDiv.className = 'meditation-list'
        h2List.textContent = "My Meditations"

        label1.htmlFor = 'addNewMeditation'
        label1.innerText = 'Add New Meditation'
        
        input1.type = 'text'
        input1.name = 'newMeditation'

        submitInput1.type = 'submit'
        submitInput1.value = "Add New Meditation"


        meditationForm.append(label1, input1, submitInput1)

        listDiv.append(h2List, ulList, meditationForm)

       

       

        
    }

    

  
   








})