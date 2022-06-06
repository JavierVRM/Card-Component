function fetchData (url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export default {fetchData}