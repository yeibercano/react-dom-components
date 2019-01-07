/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
export default class DOMModel {
    constructor(element) {
        this.props = {};
        this.props.element = element;
        this.element = element;
        this.getId();
        this.getClassList();
        this.getChildNodes();
    }

    getId() {
        this.props.id = this.element.id;
    }

    getClassList() {
        this.props.classList = this.element.classList;
    }

    getDataAttribute(name) {
        this.props[name] = this.element.dataset[name];
    }

    getAttribute(name, propName) {
        if (!propName) {
            propName = name;
        }
        this.props[propName] = this.element.getAttribute(name);
    }

    getTextContent() {
        const textNode = this.getChildNode('#text');
        if (textNode !== undefined) {
            this.props['text'] = textNode.textContent;
        } else {
            this.props['text'] = null;
        }
    }

    getChildDOMModel(name, model) {
        const childElement = this.getChildNode(name);
        if (childElement !== undefined) {
            this.props[name] = new model(childElement);
        } else {
            this.props[name] = null;
        }
    }

    getChildDOMModelArray(name, model) {
       this.props[name] = this.getChildNodes().reduce((acc, node) => {
           const nodeName = node.nodeName.toLowerCase();
           return nodeName === name
               ? acc.concat(new model(node))
               : acc;
       }, []); // use empty array as acc;
    }

    getChildNodes() {
        return [...this.element.childNodes];
    }

    getChildNode(name) {
        return this.getChildNodes().find(({ nodeName }) => {
            return nodeName.toLowerCase() === name;
        });
    }
}
