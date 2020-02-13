// import React from 'react';
// import FetchAdapter from '@services/FetchAdapter';
// import { useCpaUser } from '@context/CpaUserContext';
// import { minutesToMs } from '@toolkit/helperUtils';
// import IdleTimerModal from './IdleTimerModal';
// import useIdleTimer from './useIdleTimer';

// export const timeToMs = (time: string): number => {
//     // input is in format of HH:MM and outputs the time in milliseconds
//     // ex: 12:05 is equal to 12 hours and 5 minutes, output will be 43500000
//     const [hours, minutes] = time.split(':');
//     const hrs = parseInt(hours, 10);
//     const mins = parseInt(minutes, 10);
//     if (Number.isNaN(hrs) === true || Number.isNaN(mins) === true) {
//         return 0;
//     }
//     return minutesToMs(hrs * 60) + minutesToMs(mins);
// };
// const IdleTimer = (): JSX.Element => {
//     const [timeout, setTimeout] = React.useState<number>(0);
//     const { data } = useCpaUser();
//     const {
//         showWarning, timedOut, cancelWarning, getLastActiveTime,
//     } = useIdleTimer({
//         startTimer: timeout !== 0,
//         timeout,
//         warning: timeout > minutesToMs(5) ? timeout - minutesToMs(5) : timeout / 2,
//     });

//     React.useEffect(() => {
//         // eslint-disable-next-line no-useless-return
//         if (!data ?.FirmDetail.FirmId) return;
//         // FetchAdapter.call<InactivityPeriod>(
//         //     'InactivityPeriod',
//         //     { firmID: data?.FirmDetail.FirmId }
//         // ).then(resp => {
//         //     const time = timeToMs(resp.FRIdleTime);
//         //     setTimeout(time || minutesToMs(20));
//         // });
//         // eslint-disable-next-line
//     }, [data]);
//     React.useEffect(() => {
//         const logoutLink = process.env.FILEROOM_LOGOUT;
//         if (timedOut) {
//             FetchAdapter.call<string>('Cpa_Logout').then((resp) =>
//                 window.location.replace(`${logoutLink}?firmid=${data ?.FirmDetail.FirmId}`));
//         }
//     }, [data, timedOut]);
//     return (
//         <IdleTimerModal
//             open={showWarning && !timedOut}
//             onCancel={cancelWarning}
//             getLastActiveTime={getLastActiveTime}
//             timeout={timeout}
//         />
//     );
// };

// export default IdleTimer;
