const template = document.createElement('template')
template.innerHTML = `
    <h5>Player Card Component</h5>
`

class PlayerCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode:'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

export default PlayerCard