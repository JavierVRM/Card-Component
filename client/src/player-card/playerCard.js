import globalMethods from '../global-methods/globalMethods.js'


class PlayerCard extends HTMLElement {
    playersRawData = globalMethods.fetchData('http://localhost:3000/data')
    playerName = ''
    playerData = {}
    constructor() {
        super()
        this.attachShadow({ mode:'open' })
    }
    
    connectedCallback() {
        this.render()
        this.setSelectData()
    }

    // Here I tried to make work the 'component rendering way' but couldn't make it so I took the 'good' old road
    // Creates the Selector by the data in the database
    setSelectData = () => {     
        const selector = this.shadowRoot.querySelector('.player__card__selector')
        this.playersRawData.then((data) => {
            for (let player of data.players) {
                const playerName = `${player.player.name.first} ${player.player.name.last}`
                selector.insertAdjacentHTML('beforeend',`
                    <option class='option__player' value='${playerName}'>${playerName}</option>`)
            }
        })  
        this.getPlayerName(selector)   
    }
    // Gets the current player name and adds a listener to the select
    getPlayerName = (selector) => {
        selector.addEventListener('change', (e) => {
            this.playerName = e.target.value
            this.getPlayerData();
        })
        
    }
    // Gets the current player data by the name retrieved in the select
    getPlayerData = () => {
        this.playersRawData.then((data) => {
            const lastName = this.playerName.split(' ').pop()
            const findPlayer = data.players.find(player => {
                return player.player.name.last === lastName
            })
            this.playerData = findPlayer
            console.log(this.playerData)
        }).then(() => {
            this.setPlayerStats()
            this.setPlayerData()
        })
    }
    // Sets player stats in the stats list
    setPlayerStats = () => {
        let dataSpans = this.shadowRoot.querySelectorAll('.data')
        dataSpans = [...dataSpans]
        const playerStats = this.playerData.stats

        const appearances = globalMethods.getValueByName('appearances',playerStats) 
        const goals = globalMethods.getValueByName('goals',playerStats) 
        const goalAssist = globalMethods.getValueByName('goal_assist',playerStats) 

        const minsPlayed = globalMethods.getValueByName('mins_played',playerStats) 
        const passes = globalMethods.getValueByName('fwd_pass',playerStats)  + globalMethods.getValueByName('backward_pass',playerStats) 

        let goalsPerMatch = (goals / appearances).toFixed(2)
        let passesPerMinute = (passes / minsPlayed).toFixed(2)
       
        for(let dataSpan of dataSpans) {
            switch (dataSpan.id) {
                case 'appearances':
                    dataSpan.innerHTML = appearances;
                    break;
                case 'goals':
                    dataSpan.innerHTML = goals;
                    break;
                case 'goal_assists':
                    dataSpan.innerHTML = goalAssist;
                    break;
                case 'goals_per_match':
                    dataSpan.innerHTML = goalsPerMatch;
                    break;
                case 'passes_per_minute':
                    dataSpan.innerHTML = passesPerMinute;
                    break;
            }
        }
    }
    // Sets player data in the player list
    setPlayerData = () => {
        const playerData = this.playerData.player
        const playerName = this.playerName
        const playerPosition  = playerData.info.positionInfo.split(' ').pop()
        const playerTeam = playerData.currentTeam.name
        const playerTeamRaw = playerTeam.split(' ').join('_')
        console.log(playerTeamRaw)
        this.shadowRoot.querySelector('.player__name').innerHTML = playerName
        this.shadowRoot.querySelector('.player__position').innerHTML = playerPosition
        this.shadowRoot.querySelector('.player__club__img').src = `/images/${playerTeamRaw}.png`
        this.shadowRoot.querySelector('.player__photo__img').src = `/images/${playerName}.png`
        const cardTopBg = this.shadowRoot.querySelector('.player__card__images')
        cardTopBg.style.backgroundImage = `url(/images/${playerTeamRaw}_BG.png)`
        cardTopBg.style.backgroundSize = 'initial'
        if (playerTeamRaw === 'Tottenham_Hotspur') {
            cardTopBg.style.backgroundPosition = '-400px'    
        } else {
            cardTopBg.style.backgroundPosition = 'initial'
        }
    }
    
    // Gets the style file link
    get style() {
        return `<style>@import './player-card/css/style.css' </style>`
    }
    // HTML Template
    get template () {
        return `<section class="player__card__container">
            
            <div class="player__card__images">
                <select class="player__card__selector">
                    <option class='option__placeholder' selected disabled hidden>Select a player...</option>
                </select>
                <img class="player__photo__img" src='/images/players-compo.png'>
                <img class="player__club__img" src="/images/badges_sprite.png" alt="" class="player__club__img">
            </div>
            <div class="player__card__info">
                <p class="player__name"></p>
                <p class="player__position"></p>
                <ul class="player__stats">
                    <li class="player__stat appearances">
                    <span>Appearances</span><span id='appearances' class='data'></span>
                    </li>
                    <li class="player__stat goals">
                    <span>Goals</span><span id='goals' class='data'></span>
                    </li>
                    <li class="player__stat assists">
                    <span>Assists</span><span id='goal_assists' class='data'></span>
                    </li>
                    <li class="player__stat goals_per_match">
                    <span>Goals per match</span><span id='goals_per_match' class='data'></span>
                    </li>
                    <li class="player__stat passes_per_minute">
                    <span>Passes per minute</span><span id='passes_per_minute' class='data'></span>
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