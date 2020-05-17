
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')
const msgThree = document.querySelector('#msg3')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    msgOne.textContent = ''
    msgTwo.textContent = ''
    msgThree.textContent = ''
    
    const location = search.value
    msgOne.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msgOne.textContent = data.error

            }
            else{
                msgOne.textContent = 'Location:' + data.location,
                msgTwo.textContent = data.temperature,
                msgThree.textContent = 'Overall ' + data.overall
            }
        })
    })
})