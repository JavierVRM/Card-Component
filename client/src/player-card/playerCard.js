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

    playersRawData;

    constructor() {
        super()
        this.attachShadow({ mode:'open' })

        this.playersRawData = globalMethods.fetchData('http://localhost:3000/data')

    }

    setSelectData = () => {        
        this.playersRawData.then((data) => {
            const selector = this.shadowRoot.querySelector('.player__card__selector')
            for (let player of data.players) {
                const playerName = `${player.player.name.first} ${player.player.name.last}`
                selector.insertAdjacentHTML('beforeend',`
                    <option class='option__player' data-player='${player.player.id}' value='${playerName}'>${playerName}</option>`)
            }
        })
            
    }

    connectedCallback() {
        this.setSelectData();
        this.render();
    }

    get style() {
        return `<style>@import './player-card/css/style.css' </style>`
    }

    get template () {
        return `<section class="player__card__container">
            
            <div class="player__card__images">
                <select class="player__card__selector">
                    <option class='option__placeholder' selected disabled hidden>Select a player...</option>
                </select>
                <img class="player__photo__img" src='/images/players_compo.jpg'>
                <img class="player__club__img" src="/images/badges_sprite.png" alt="" class="player__club__img">
            </div>
            <div class="player__card__info">
                <div class="player__name">${this.playerName || "Player name"}</div>
                <div class="player__position">Position</div>
                <ul class="player__stats">
                    <li class="player__stat appearances">
                    <span>Appearances</span><span class='data'></span>
                    </li>
                    <li class="player__stat goals">
                    <span>Goals</span><span class='data'></span>
                    </li>
                    <li class="player__stat assists">
                    <span>Assists</span><span class='data'></span>
                    </li>
                    <li class="player__stat goalspm">
                    <span>Goals per match</span><span class='data'></span>
                    </li>
                    <li class="player__stat passespm">
                    <span>Passes per minute</span><span class='data'></span>
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