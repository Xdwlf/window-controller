import React, {
    useState, useEffect, useRef, ReactNode,
} from 'react';
import { cssBind } from '@toolkit/helperUtils';
import EventEmitter from '@services/EventEmitter';
import SnackbarItem, { variantIcon } from './SnackbarItem';
import styles from './SnackbarContainer.less';

const css = cssBind(styles);
const SnackbarEventEmitter = new EventEmitter();

type SnackbarInfo = {
    message: ReactNode;
    type: keyof typeof variantIcon;
    disableAutoHide?: boolean;
}

export type SnackbarType = SnackbarInfo & {
    id: string;
}

type State = SnackbarType[];

export const SnackbarEvent = (snackbar: SnackbarInfo): void => {
    SnackbarEventEmitter.emit('snackbar', snackbar);
};

const SnackbarContainer = (): JSX.Element => {
    const [snackbars, setSnackbar] = useState<State>([]);

    const removeSnackbar = (id: string): void => {
        const newSnackbars = snackbars.filter((sb: SnackbarType) => id !== sb.id);
        setSnackbar(newSnackbars);
    };

    const addSnackbar = (snackbarInfo: SnackbarInfo): void => {
        const { message, type, disableAutoHide } = snackbarInfo;
        const newSnackbar: SnackbarType = {
            message,
            type,
            disableAutoHide,
            id: Math.random().toString(),
        };
        const newSnackbars: SnackbarType[] = [...snackbars, newSnackbar];
        setSnackbar(newSnackbars);
    };

    const addSnackbarRef = useRef(addSnackbar);

    useEffect(() => {
        addSnackbarRef.current = addSnackbar;
    });


    useEffect(() => {
        const currentAddSnackbar = (data: SnackbarInfo): void => addSnackbarRef.current(data);
        SnackbarEventEmitter.subscribe(['snackbar'], currentAddSnackbar);
        return (): void => {
            SnackbarEventEmitter.unSubscribe(['snackbar'], currentAddSnackbar);
        };
    }, []);

    return (
        <div className={css('snackbarContainer')}>
            {snackbars.map((snackbar: SnackbarType) => (
                <SnackbarItem
                    key={snackbar.id}
                    snackbar={snackbar}
                    removeSnackbar={removeSnackbar}
                />
            ))}

        </div>
    );
};

export default SnackbarContainer;
