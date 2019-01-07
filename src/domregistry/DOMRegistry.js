/* global document, MutationObserver */
/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
export default class DOMRegistry {
    constructor(element) {
        this.element = element || document;
    }

    register(components) {
        this.components = Object.keys(components);
        this.nodeNames = this.getNodeNames();
        this.init(this.element);
    }

    /**
     * Render the component. If an element is not supplied,
     * the element class property will be used to find all
     * nodes to be rendered.
     * @param {DOMComponent} component
     * @param {HTMLElement} element
     */
    render(component, element) {
        if (element) {
            component.render(element);
        } else {
            this.renderAll(this.element, component);
        }
    }

    /**
     * Initialize the supplied element to find
     * child components and render them.
     */
    init(parentElement) {
        // Loop through all registred DOM Components
        this.components.forEach((name) => {
            this.renderAll(parentElement, this.components[name]);
        });
    }

    renderAll(parentElement, component) {
        // Find all potential nodes of the components
        const componentNodes = parentElement.querySelectorAll(component.nodeName);

        // Loop through each node and determine if we can render it.
        Array.prototype.forEach.call(componentNodes, function(componentNode) {
            const canRender = this.traverseUpDom(componentNode);
            if (canRender) {
                component.render(componentNode);
            }
        }.bind(this));
    }

    /**
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */
     traverseUpDom({ parentNode } = {}) {
        // If the DOM has already been swapped out by React, the parent node will be null.
        if (parentNode === null) return false;

        const parentNodeName = parentNode.nodeName.toLowerCase();
        
        if (this.nodeNames.includes(parentNodeName)) {
            return false;
        }
        
        if (parentNodeName === 'body') {
            return true;
        }
        // recurse until exausting the tree
        return this.traverseUpDom(parentNode);
    }

    /**
     * Create an array of element node names to look for.
     * @return {array} nodeNames
     */
    getNodeNames() {
        return this.components.map(({ nodeName } = {}) => nodeName);
    }
}
