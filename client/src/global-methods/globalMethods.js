// Fetchs from given url
function fetchData (url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log(error))
}

// Returns the value of an item in an array of objects with the proper keys
function getValueByName (name, arr) {
    for (let data of arr) {
        if (data.name == name) {
            console.log(data.value)
            return data.value
        }
    }
    return 0
}



export default {fetchData, getValueByName}