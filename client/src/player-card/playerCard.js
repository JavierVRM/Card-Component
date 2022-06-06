import globalMethods from '../global-methods/globalMethods.js'


class PlayerCard extends HTMLElement {
    playerClub = ''
    playerImg = ''
    playerName = ''
    playerPosition = ''
    playerAppearances = ''
    playerGoals = ''
    playerAssists = ''
    playerGoalsPm = ''
    playerPassesPm = ''

    constructor() {
        super()
        this.attachShadow({ mode:'open' })


        const playersRawData = globalMethods.fetchData('http://localhost:3000/data')
        const playerData = {}
        playersRawData.then((data) => {
            for (let player of data.players) {
                console.log(player.player.name)
            }
        })
        
    }

    connectedCallback() {
        this.render();
    }

    get style() {
        return `<style>@import '/style.css' </style>`
    }

    get template () {
        return `<section class="player__card__container">
            
            <div class="player__card__images">
                <select class="player__card__selector">
                <option>Select bla</option>
                <option>Hristo Stoichkov</option>
                </select>
                <img class="player__photo__img" src='https://tmssl.akamaized.net/images/foto/galerie/hristo-stoichkov-bei-barcelona-1575285527-27908.jpg?lm=1575285533'>
                <img class="player__club__img" src="https://tmssl.akamaized.net/images/foto/galerie/hristo-stoichkov-bei-barcelona-1575285527-27908.jpg?lm=1575285533" alt="" class="player__club__img">
            </div>
            <div class="player__card__info">
                <div class="player__name">Hristo Stoichkov</div>
                <div class="player__position">Striker</div>
                <ul class="player__stats">
                    <li class="player__stat appearances">
                    <span>appearances</span><span>10</span>
                    </li>
                    <li class="player__stat goals">
                    <span>appearances</span><span>10</span>
                    </li>
                    <li class="player__stat assists">
                    <span>appearances</span><span>10</span>
                    </li>
                    <li class="player__stat goalspm">
                    <span>appearances</span><span>10</span>
                    </li>
                    <li class="player__stat passespm">
                    <span>appearances</span><span>10</span>
                    </li>
                </ul>
            </div>
        </section>
        `
    }

    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`
    }
}

export default PlayerCard