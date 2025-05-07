class HtmlElement {
    constructor(tagName, isSelClosing = false, textContent = '') {
        this.tagName = tagName
        this.isSelClosing = isSelClosing
        this.textContent = textContent
        this.attributes = {}
        this.styles = {}
        this.children = []
    }

    setAttribute(name, value) {
        this.attributes[name] = value
        return this
    }
    setStyle(name, value) {
        this.styles[name] = value
        return this
    }
    appenChild(element) {
        this.children.push(element)
        return this
    }

    prependChild(element) {
        this.children.unshift(element)
        return this
    }
    getHtml() {
        let htmlString = `<${this.tagName} `

        for (const [name, value] of Object.entries(this.attributes)) {
            htmlString += `${name}="${value}"`
        }

        const styles = Object.entries(this.styles)
        const stylesString = styles.map(([name, value]) => `${name}:${value}`).join(';')
        htmlString += `style="${stylesString}"`

        htmlString += `>`


        if (this.textContent.length) {
            htmlString += this.textContent
        }
        if (this.isSelClosing) {
            return htmlString += '/>'
        }

        for (const child of this.children) {
            htmlString += child.getHtml()
        }

        htmlString += `</${this.tagName}>`
        return htmlString
    }

}
const examle = new HtmlElement('div')
examle.setStyle('color', 'green')
examle.textContent = 'Пример'

document.body.insertAdjacentHTML('beforeend', examle.getHtml())

// 

class Circle {
    #radius

    constructor(radius) {
        this.#radius = radius

    }
    get radius() {
        return this.#radius
    }
    set radius(value) {
        if (value <= 0) {
            throw new Error('радиус может быть только положительный')
        }
        this.#radius = value
    }
    get diametr() {
        return this.#radius * 2
    }
    area() {
        return Math.PI * Math.pow(this.#radius, 2)
    }
    circumference() {
        return 2 * Math.Pi * this.#radius
    }

}
const circle = new Circle(5)

console.log(`радиус: ${circle.radius}`)
console.log(`диаметр: ${circle.diametr}`)
console.log(`Площадь: ${circle.area().toFixed(2)}`)
console.log(`длина окружности: ${circle.circumference().toFixed(2)}`)
