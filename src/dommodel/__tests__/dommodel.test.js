import DOMMdel from '../DOMModel';

const element = document.createElement('div');
element.dataset.id = 'id';
element.dataset.title = 'title';

describe('DOM Model', () => {
    const domModel = new DOMMdel(element);
    test('should assign the element to the props.element', () => {
        expect(domModel.props.element).toEqual(element);
    });
});
