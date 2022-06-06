import globalMethods from '../global-methods/globalMethods.js'

const template = document.createElement('template')
template.innerHTML = `
<section class="player__card__container">
    <select class="player__card__selector">
    </select>
    <div class="player__card__images">
        <img class="player__photo__img">
        <div class="player__club">
            <img src="" alt="" class="player__club__img">
        </div>
    </div>
    <div class="player__card__info">
        <div class="player__name"></div>
        <div class="player__position"></div>
        <ul class="player__stats">
            <li class="player__stat appearances"></li>
            <li class="player__stat goals"></li>
            <li class="player__stat assists"></li>
            <li class="player__stat goalspm"></li>
            <li class="player__stat passespm"></li>
        </ul>
    </div>
</section>
`

class PlayerCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode:'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        const playersData = globalMethods.fetchData('http://localhost:3000/data')
        
    }
}

export default PlayerCard