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
        this.components = components;
        this.nodeNames = this.getNodeNames();
        this.init(this.element);
    }

    /**
     * Initialize the supplied element to find
     * child components and render them.
     */
     init(parentElement) {
         // Loop through all registred DOM Components
         this.components.forEach((component) => {
             this.renderAll(parentElement, component);
         });
     }

    renderAll(parentElement, { nodeName } = {}) {
        // Find all potential nodes of the components
        const componentNodes = parentElement.querySelectorAll(nodeName);

        // Loop through each node and determine if we can render it.
        componentNodes.forEach((componentNode) => {
            const canRender = this.traverseUpDom(componentNode);
            if (canRender) {
                component.render(componentNode);
            }
        });
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
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */
    traverseUpDom({ parentNode } = {}) {
        // If the DOM has already been swapped out by React, the parent node will be null.
        if (!parentNode) return false;

        const parentNodeName = parentNode.nodeName.toLowerCase();
        // base case
        if (this.nodeNames.includes(parentNodeName)) {
            return false;
        } else if (parentNodeName === 'body') {
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
