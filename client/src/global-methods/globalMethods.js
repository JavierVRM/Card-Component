function fetchData (url) {
    fetch(url)
        .then(res => res.json())
        .then(res => console.log(res))
}

export default {fetchData}