import React from 'react';
import ParentWindowAdapter, { SiblingMessage } from '@services/ParentWindowAdapter';
import Typography from '@components/Typography';
import { Button, TextField } from '@material-ui/core';
import usePostMessage from 'src/hooks/usePostMessage';
import styles from './ParentWindow.less';

const popupUrl = 'http://localhost:3000/popup.html';

const ParentWindow = (): JSX.Element => {
    const [error, setError] = React.useState<string | null>(null);
    const [parentChannelVal, setParentChannelVal] = React.useState('');
    const [childChannelVal, setChildChannel] = React.useState('');
    const [messages, setMessages] = React.useState<SiblingMessage[]>([]);

    const [lastMessage, postMessage] = usePostMessage<string>('livetext', childChannelVal);

    const openWindow = () => {
        setError(null);
        const response = ParentWindowAdapter.openChildWindow(popupUrl, '_blank');
        if (response.error) {
            setError(response.error);
        }
    };

    const handleParentChannelChange = (event: any) => {
        setParentChannelVal(event.target.value);
    };

    const handleChildChannelChange = (event: any) => {
        setChildChannel(event.target.value);
    };

    React.useEffect(() => {
        const addToMessages = (data: SiblingMessage): void => {
            if (!data?.message) return;
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        ParentWindowAdapter.subscribeSiblingMessages(addToMessages);
    }, []);

    const sendParentChannelMessage = () => {
        ParentWindowAdapter.sendSiblingMessage(parentChannelVal);
        setParentChannelVal('');
    };
    return (
        <div className={styles.parent}>
            <Typography tag="h3">
                Parent Window ID:{' '}
                <Typography color="body">
                    {ParentWindowAdapter.windowId}
                </Typography>
            </Typography>
            <div className={styles.channelContainer}>
                <div className={styles.parentChannelContainer}>
                    <div className={styles.parentChannelInputContainer}>
                        <TextField
                            label="Parent Channel"
                            variant="outlined"
                            value={parentChannelVal}
                            color="secondary"
                            className={styles.input}
                            onChange={handleParentChannelChange}
                        />
                        <Button
                            onClick={sendParentChannelMessage}
                            variant="contained"
                            color="primary"

                        >
                            Send Message
                        </Button>
                    </div>
                    <div className={styles.messageContainer}>
                        <Typography
                            color="primary"
                            bold
                        >
                            Channel Messages
                        </Typography>
                        {messages.map((item) => (
                            <Typography
                                tag="div"
                                color="body"
                                className={styles.message}

                                key={item.timestamp}
                            >
                                <Typography color="secondary" bold>{item.windowId}</Typography>
                                <div className={styles.messageText}>
                                    {item.message}
                                </div>
                            </Typography>
                        ))}
                    </div>

                </div>
                <div className={styles.childChannelContainer}>
                    <TextField
                        label="Child Channel"
                        variant="outlined"
                        value={childChannelVal}
                        color="secondary"
                        className={styles.input}
                        onChange={handleChildChannelChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openWindow}
                    >
                        Open Child Window
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}

                </div>
            </div>
        </div>
    );
};

export default ParentWindow;
