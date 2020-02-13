import React from 'react';
import {
    render, fireEvent, wait,
} from '@testing-library/react';
import useDocumentTitle from './index';

const aTitle = "Dedication: To me. I couldn't have done it without you.";
const bTitle = 'I am not perfect, but if I looked perfect to everyone I must have been rocking imperfect perfectly to a few imperfect souls that seek imperfection vs. perfection, in an imperfect world where God asks us to seek perfection for our imperfect souls.';
const cTitle = 'They misunderestimated me.';


const Component = ({ children, text }: any) => {
    const [show, setShow] = React.useState(false);
    const [title, setTitle] = React.useState(text);
    useDocumentTitle(title);

    return (
        <div>
            <button onClick={() => { setShow(!show); }} type="button">{title}</button>
            {show && children}
        </div>
    );
};


const Container = (): JSX.Element => {
    const [show, setShow] = React.useState(true);

    return (
        <div>
            <button type="button" onClick={() => setShow(!show)}>Parent Click</button>
            {
                show
                && (
                    <Component text={aTitle}>
                        <Component text={bTitle}>
                            <Component text={cTitle} />
                        </Component>
                    </Component>
                )
            }
        </div>
    );
};

describe('useDocumentTitle', () => {
    beforeEach(() => {
        document.title = '';
    });

    test('sets document title to the latest called document title', () => {
        const { getByText, queryByText } = render(<Container />);
        const firstButton = getByText(aTitle);
        expect(document.title).toBe(aTitle);
        fireEvent.click(firstButton);
        const secondButton = getByText(bTitle);
        expect(document.title).toBe(bTitle);
        fireEvent.click(secondButton);
        expect(document.title).toBe(cTitle);
        fireEvent.click(secondButton);
        expect(document.title).toBe(bTitle);
        fireEvent.click(firstButton);
        expect(document.title).toBe(aTitle);
        const parentButton = getByText('Parent Click');
        fireEvent.click(parentButton);
        expect(queryByText(aTitle)).toBeNull();
        expect(document.title).toBe(aTitle);
    });
});
