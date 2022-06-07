import globalMethods from '../global-methods/globalMethods.js'


class PlayerCard extends HTMLElement {
    goals = ''
    assists = ''
    playersRawData = globalMethods.fetchData('http://localhost:3000/data')

    constructor() {
        super()
        this.attachShadow({ mode:'open' })
        
    }

    // static get observedAttributes() {
    //     return ['name', 'position', 'appearances', 'goals', 'assists', 'goalspm', 'passespm'];
    // }

    static get observedAttributes() {
        return ['goals', 'assists'];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        // make sure it is mounted first
        if (this.isConnected) {
          switch (attribute) {
            case 'goals':
              this.goals = newValue;
              break;
            case 'assists':
              this.assists = newValue;
              break;
          }
          console.log('newVal', newValue)
          this.render()
        }
    }
    
    connectedCallback() {
        this.setSelectData();
        this.render(); 
    }

    setSelectData = () => {        
        this.playersRawData.then((data) => {
            const selector = this.shadowRoot.querySelector('.player__card__selector')
            for (let player of data.players) {
                const playerName = `${player.player.name.first} ${player.player.name.last}`
                selector.insertAdjacentHTML('beforeend',`
                    <option class='option__player' value='${playerName}'>${playerName}</option>`)
            }
            this.getPlayerName(selector)
        })
            
    }

    getPlayerName = (selector) => {
        selector.addEventListener('change', (e) => {
            // this.playerName = e.target.value
            this.goals = this.goals + 1
            this.assists = this.assists + 1
            console.log(this.goals)
        })
    }

    get style() {
        return `<style>@import './player-card/css/style.css' </style>`
    }

    // get template () {
    //     return `<section class="player__card__container">
            
    //         <div class="player__card__images">
    //             <select class="player__card__selector">
    //                 <option class='option__placeholder' selected disabled hidden>Select a player...</option>
    //             </select>
    //             <img class="player__photo__img" src='/images/players_compo.jpg'>
    //             <img class="player__club__img" src="/images/badges_sprite.png" alt="" class="player__club__img">
    //         </div>
    //         <div class="player__card__info">
    //             <div class="player__name">${this.name}</div>
    //             <div class="player__position">${this.position}</div>
    //             <ul class="player__stats">
    //                 <li class="player__stat appearances">
    //                 <span>Appearances</span><span class='data'>${this.appearances}</span>
    //                 </li>
    //                 <li class="player__stat goals">
    //                 <span>Goals</span><span class='data'>${this.goals}</span>
    //                 </li>
    //                 <li class="player__stat assists">
    //                 <span>Assists</span><span class='data'>${this.assists}</span>
    //                 </li>
    //                 <li class="player__stat goalspm">
    //                 <span>Goals per match</span><span class='data'>${this.goalspm}</span>
    //                 </li>
    //                 <li class="player__stat passespm">
    //                 <span>Passes per minute</span><span class='data'>${this.passespm}</span>
    //                 </li>
    //             </ul>
    //         </div>
    //     </section>
    //     `
    // }
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
                <div class="player__name"></div>
                <div class="player__position"></div>
                <ul class="player__stats">
                    <li class="player__stat appearances">
                    <span>Appearances</span><span class='data'></span>
                    </li>
                    <li class="player__stat goals">
                    <span>Goals</span><span class='data'>${this.goals}</span>
                    </li>
                    <li class="player__stat assists">
                    <span>Assists</span><span class='data'>${this.assists}</span>
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