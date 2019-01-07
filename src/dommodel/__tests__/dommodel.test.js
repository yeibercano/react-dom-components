import DOMMdel from '../DOMModel';

const element = document.createElement('div');
element.dataset.id = 'id';
element.dataset.title = 'title';

test('DOM Model', () => {
    const domModel = new DOMMdel(element);
    it('element should be assigned to the props object', () => {
        expect(domModel.props.element).toEqual(element);
    });
});
