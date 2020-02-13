/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import SurePrepLogo from '@assets/icons/sureprep-logo.png';
import { Button } from '@material-ui/core';
import edge from '@assets/icons/browser-edge.png';
import chrome from '@assets/icons/browser-chrome.png';
import safari from '@assets/icons/browser-safari.png';
import firefox from '@assets/icons/browser-firefox.png';
import styles from './unsupported-browser.less';
import { isSupported } from './feature-detect';
import 'core-js/es/map';
import 'core-js/es/set';

var root = document.getElementById('browser-support');

var buttonStyle = {
    background: '#18B86b',
    border: 0,
    color: 'white',
    height: 42,
    'text-transform': 'none',
};

function UnsupportedBrowser (): JSX.Element | null {
    var state = React.useState(isSupported() === false);
    var show = state[0];
    var setShow = state[1];
    if (show === false) return null;
    return (
        <div className={styles.root} style={{ zIndex: 9999 }}>
            <div className={styles.content}>
                <div>
                    <img
                        className={styles.logo}
                        alt="SurePrep Logo"
                        src={SurePrepLogo}
                    />
                </div>
                <h1>Unsupported Browser</h1>
                <p>
                    You are using a browser that is either unsupported or outdated.
                    Please use one of these options below or update your current browser to improve your experience.
                </p>
                <div className={styles.browsers}>
                    <a
                        href="https://www.google.com/chrome/browser/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={chrome} alt="" />
                        Google Chrome
                    </a>
                    <a
                        href="https://www.microsoft.com/en-us/windows/microsoft-edge"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={edge} alt="" />
                        Microsoft Edge
                    </a>
                    <a
                        href="https://www.mozilla.org/firefox"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={firefox} alt="" />
                        Mozilla Firefox
                    </a>
                    <a
                        href="https://www.apple.com/safari/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={safari} alt="" />
                        Safari
                    </a>
                </div>
                <Button onClick={function(){setShow(false)}} style={buttonStyle}>
                    Continue Using My Browser
                </Button>
            </div>
        </div>
    );
};

if (isSupported() === false) {
    try {
        ReactDOM.render(<UnsupportedBrowser />, root);
    } catch (error) {
        document.write('Browser is not supported');
    }
}
