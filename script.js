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


// 3 задание

class CssClass {
    constructor(name, styles) {
        this.name = name
        this.styles = {}
        for (let key in styles) {
            if (this.checkKey(key)) {
                this.styles[key] = styles[key]
            }
        }
    }
    checkKey(key) {
        const style = document.body.style
        return key in style
    }
    setStyle(key, value) {
        if (!this.checkKey(key)) {
            return
        }
        this.styles[key] = value
    }
    unsetStyle(key){
        delete this.styles[key]
    }
    getStyle(key){
        return this.styles[key]
    }
    getCss(){
        return`.${this.name}${JSON.stringify(this.styles)
            .replace(/\,/g,"; \n")
            .replace(/"/g, "")}`
    }
}
const main = new CssClass('main')
main.setStyle('font-size', '2em')
main.setStyle('color')
console.log(main.getCss())
