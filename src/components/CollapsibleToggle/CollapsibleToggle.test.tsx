import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CollapsibleToggle from './index';

const Component = (props: any): JSX.Element => (
    <CollapsibleToggle {...props.toggleProps}>
        <CollapsibleToggle.Header {...props.headerProps}>
            {props.header}
        </CollapsibleToggle.Header>
        <CollapsibleToggle.Content {...props.contentProps}>
            {props.content}
        </CollapsibleToggle.Content>
    </CollapsibleToggle>
);

const ControllingComponent = ({ open, ...otherProps }: any) => {
    const [isOpen, setIsOpen] = React.useState(open);
    return (
        <div>
            <Component toggleProps={{ open: isOpen, onClick: () => { setIsOpen(!isOpen); } }} {...otherProps} />
        </div>
    );
};

describe('<CollapsibleToggle>', () => {
    describe('should work as an uncontrolled component', () => {
        test('hides content initially', () => {
            const header = 'Go, prick thy face and over-red thy fear';
            const content = 'Thou lily-livered boy';
            const { queryByText } = render(<Component
                header={header}
                content={content}
            />);
            expect(queryByText(header)).toBeInTheDocument();
            expect(queryByText(content)).not.toBeInTheDocument();
        });
        test('shows content when header is clicked', () => {
            const header = 'I do desire';
            const content = 'we may be better strangers';
            const { queryByText, getByText } = render(<Component
                header={header}
                content={content}
            />);
            const headerButton = getByText(header);
            expect(headerButton).toBeInTheDocument();
            expect(queryByText(content)).not.toBeInTheDocument();
            fireEvent.click(headerButton);
            expect(queryByText(content)).toBeInTheDocument();
        });
        test('runs onclick when header is clicked', () => {
            const mockFn = jest.fn(() => 'something');
            const header = 'Out!';
            const content = 'Vile Jelly';
            const { queryByText, getByText } = render(<Component
                toggleProps={{ onClick: mockFn }}
                header={header}
                content={content}
            />);
            const headerButton = getByText(header);
            expect(mockFn).not.toBeCalled();
            expect(queryByText(content)).not.toBeInTheDocument();
            fireEvent.click(headerButton);
            expect(queryByText(content)).toBeInTheDocument();
            expect(mockFn).toBeCalled();
        });
        test('does not unmount component after mounting first time', () => {
            const header = "Thou elvish-mark'd, abortive, rooting hog!";
            const mockFn = jest.fn();
            const unmountFn = jest.fn();
            const ContentComponent = (props: any): JSX.Element => {
                mockFn();
                React.useEffect(() => unmountFn, []);
                return (
                    <div>Away, you starvelling, you elf-skin, you dried neats-tongue, bulls-pizzle, you stock-fish!
                    </div>
                );
            };
            const { getByText } = render(<Component
                header={header}
                content={<ContentComponent />}
            />);
            expect(mockFn).not.toBeCalled();
            fireEvent.click(getByText(header));
            expect(mockFn).toBeCalled();
            fireEvent.click(getByText(header));
            expect(unmountFn).not.toBeCalled();
        });
        test('handles isDefaultOpen correctly', () => {
            const header = 'Thou sodden-witted lord!';
            const content = 'Thou hast no more brain than I have in mine elbows';
            const { queryByText } = render(<Component
                toggleProps={{ isDefaultOpen: true }}
                header={header}
                content={content}
            />);
            expect(queryByText(header)).toBeInTheDocument();
            expect(queryByText(content)).toBeInTheDocument();
        });
    });
    describe('should work as a controlled component', () => {
        test('hides content initially', () => {
            const header = 'You poor, base, rascally, cheating';
            const content = 'lack-linen mate!';
            const { queryByText } = render(<ControllingComponent header={header} content={content} />);
            expect(queryByText(header)).toBeInTheDocument();
            expect(queryByText(content)).not.toBeInTheDocument();
        });
        test('shows content when header is clicked', () => {
            const header = '“The tartness of his face”';
            const content = 'sours ripe grapes.';
            const { queryByText, getByText } = render(<ControllingComponent header={header} content={content} />);
            const headerButton = getByText(header);
            expect(headerButton).toBeInTheDocument();
            expect(queryByText(content)).not.toBeInTheDocument();
            fireEvent.click(headerButton);
            expect(queryByText(content)).toBeInTheDocument();
        });
        test('runs onclick when header is clicked', () => {
            const mockFn = jest.fn();
            const header = 'A foul and pestilent congregation of vapours.';
            const content = 'What a piece of work is man!';

            const { queryByText, getByText } = render(<ControllingComponent
                toggleProps={{ onClick: mockFn }}
                header={header}
                content={content}
            />);

            const headerButton = getByText(header);
            expect(mockFn).not.toBeCalled();
            expect(queryByText(content)).not.toBeInTheDocument();
            fireEvent.click(headerButton);
            expect(queryByText(content)).toBeInTheDocument();
            expect(mockFn).toBeCalled();
        });
        test('does not unmount component after mounting first time', () => {
            const header = 'Thou art a boil, a plague sore';
            const mockFn = jest.fn();
            const unmountFn = jest.fn();
            const ContentComponent = (props: any): JSX.Element => {
                mockFn();
                React.useEffect(() => unmountFn, []);
                return (
                    <div>an embossed carbuncle in my corrupted blood.</div>
                );
            };
            const { getByText } = render(<ControllingComponent
                toggleProps={{ onClick: mockFn }}
                header={header}
                content={<ContentComponent />}
            />);
            expect(mockFn).not.toBeCalled();
            fireEvent.click(getByText(header));
            expect(mockFn).toBeCalled();
            fireEvent.click(getByText(header));
            expect(unmountFn).not.toBeCalled();
        });
    });
});
