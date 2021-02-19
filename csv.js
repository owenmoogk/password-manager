function downloadCSV() {
    passwords = JSON.parse(localStorage.getItem("passwords"))
    if (passwords.length == 0){
        alert("You have no saved passwords!")
        return
    }
    if (confirm("This will download all saved files as a CSV. No sensitive information is passing through the internet. Please confirm.")){
        csv = ""
        myLen = passwords.length
        for (i = 0; i < myLen; i++){
            csv += passwords[i].toString()
            csv += "\n"
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'passwords.csv';
        hiddenElement.click();
    }
}