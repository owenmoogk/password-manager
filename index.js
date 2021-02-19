// GLOBAL VARIABLE
passwords = []

function getPasswords(){
    passwords = JSON.parse(localStorage.getItem("passwords"))
}

function deletePassword(element){
    elements = document.getElementById('passwords').getElementsByTagName("p")
    for (i = 0; i < elements.length; i++){
        if (elements[i] == element){
            passwords.splice(i,1)
            storePasswords()
            displayPasswords()
            return
        }
    }
}

function copyPassword(element){
    toCopy = element.innerText.slice(9)
    el = document.createElement('textarea');
    el.value = toCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function logPassword(password){
    passwords.push(password)
    storePasswords()
    displayPasswords()
}

function displayPasswords(){
    document.getElementById('passwords').innerHTML = ''
    for(i = 0; i < passwords.length; i++){
        document.getElementById("passwords").innerHTML += "<p><span onclick='deletePassword(this.parentElement)'>🗑️</span>&nbsp;&nbsp<span onclick='copyPassword(this.parentElement)'>📋</span>&nbsp;&nbsp;"+passwords[i]+"</p>"
    }

    // from https://www.codegrepper.com/code-examples/javascript/javascript+scroll+to+bottom+of+div
    div = document.getElementById("passwords");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

function storePasswords(){
    localStorage.setItem("passwords", JSON.stringify(passwords))
}

function clearStorage(){
    if (confirm("Are you sure? This will permanently delete all locally stored data.")){
        localStorage.setItem('passwords', JSON.stringify([]))
        getPasswords()
        displayPasswords()
    }
}

function customPassword(){
    password = document.getElementById('custom').value
    if (password == ''){
        return
    }
    document.getElementById('custom').value = ""
    logPassword(password)
}

function generatePassword(){
    length = validateLength()
    if (length == false){
        return
    }
    arrayOfPossibilities = []
    if (document.getElementById('upper').checked){
        for (i = 65; i < 91; i++){
            arrayOfPossibilities.push(String.fromCharCode(i))
        }
    }
    if (document.getElementById('lower').checked){
        for (i = 97; i < 123; i++){
            arrayOfPossibilities.push(String.fromCharCode(i))
        }
    }
    if (document.getElementById('numbers').checked){
        for (i = 48; i < 58; i++){
            arrayOfPossibilities.push(String.fromCharCode(i))
        }
    }
    if (document.getElementById('symbols').checked){
        for (i = 33; i < 48; i++){
            arrayOfPossibilities.push(String.fromCharCode(i))
        }
        for (i = 58; i < 65; i++){
            arrayOfPossibilities.push(String.fromCharCode(i))
        }
    }
    if (document.getElementById('duplicates').checked && arrayOfPossibilities.length < length){
        document.getElementById("length").style.border = "2px solid red"
        return
    }
    noDuplicates = document.getElementById('duplicates').checked

    // main part
    password = ""
    for (i = 0; i < length; i++){
        num = getRandomInt(0, arrayOfPossibilities.length-1)
        password += arrayOfPossibilities[num]
        if (noDuplicates){
            arrayOfPossibilities.splice(num,1)
        }
    }
    logPassword(password)
}

function validateLength(){
    length = parseInt(document.getElementById("length").value)
    if (Number.isInteger(length) && length < 100 && length > 0){
        document.getElementById("length").style.border = "2px solid black"
        return(length)
    }
    document.getElementById("length").style.border = "2px solid red"
    return(false)
}

// from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}