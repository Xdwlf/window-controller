import React from 'react';
import Alabama from '@icons/Alabama';
import Alaska from '@icons/Alaska';
import Arizona from '@icons/Arizona';
import Arkansas from '@icons/Arkansas';
import California from '@icons/California';
import Colorado from '@icons/Colorado';
import Connecticut from '@icons/Connecticut';
import DC from '@icons/DC';
import Delaware from '@icons/Delaware';
import Florida from '@icons/Florida';
import Georgia from '@icons/Georgia';
import Hawaii from '@icons/Hawaii';
import Idaho from '@icons/Idaho';
import Illinois from '@icons/Illinois';
import Indiana from '@icons/Indiana';
import Iowa from '@icons/Iowa';
import Kansas from '@icons/Kansas';
import Kentucky from '@icons/Kentucky';
import Lousiana from '@icons/Lousiana';
import Maine from '@icons/Maine';
import Maryland from '@icons/Maryland';
import Massachusetts from '@icons/Massachusetts';
import Michigan from '@icons/Michigan';
import Minnesota from '@icons/Minnesota';
import Mississippi from '@icons/Mississippi';
import Missouri from '@icons/Missouri';
import Montana from '@icons/Montana';
import Nebraska from '@icons/Nebraska';
import Nevada from '@icons/Nevada';
import NewHampshire from '@icons/NewHampshire';
import NewJersey from '@icons/NewJersey';
import NewMexico from '@icons/NewMexico';
import NewYork from '@icons/NewYork';
import NorthCarolina from '@icons/NorthCarolina';
import NorthDakota from '@icons/NorthDakota';
import Ohio from '@icons/Ohio';
import Oklahoma from '@icons/Oklahoma';
import Oregon from '@icons/Oregon';
import Pennsylvania from '@icons/Pennsylvania';
import RhodeIsland from '@icons/RhodeIsland';
import SouthCarolina from '@icons/SouthCarolina';
import SouthDakota from '@icons/SouthDakota';
import Tennessee from '@icons/Tennessee';
import Texas from '@icons/Texas';
import Utah from '@icons/Utah';
import Vermont from '@icons/Vermont';
import Virginia from '@icons/Virginia';
import Washington from '@icons/Washington';
import WestVirginia from '@icons/WestVirginia';
import Wisconsin from '@icons/Wisconsin';
import Wyoming from '@icons/Wyoming';
import { SvgIconProps } from '@material-ui/core';

interface Props extends SvgIconProps {
    stateCode: States;
}
const StateIcon = (props: Props): JSX.Element => {
    const { stateCode, ...rest } = props;
    const upperCaseCode = stateCode.toUpperCase();
    switch (upperCaseCode) {
        case 'AL':
            return <Alabama {...rest} />;
        case 'AK':
            return <Alaska {...rest} />;
        case 'AZ':
            return <Arizona {...rest} />;
        case 'AR':
            return <Arkansas {...rest} />;
        case 'CA':
            return <California {...rest} />;
        case 'CO':
            return <Colorado {...rest} />;
        case 'CT':
            return <Connecticut {...rest} />;
        case 'DC':
            return <DC {...rest} />;
        case 'DE':
            return <Delaware {...rest} />;
        case 'FL':
            return <Florida {...rest} />;
        case 'GA':
            return <Georgia {...rest} />;
        case 'HI':
            return <Hawaii {...rest} />;
        case 'ID':
            return <Idaho {...rest} />;
        case 'IL':
            return <Illinois {...rest} />;
        case 'IN':
            return <Indiana {...rest} />;
        case 'IA':
            return <Iowa {...rest} />;
        case 'KS':
            return <Kansas {...rest} />;
        case 'KY':
            return <Kentucky {...rest} />;
        case 'LA':
            return <Lousiana {...rest} />;
        case 'ME':
            return <Maine {...rest} />;
        case 'MD':
            return <Maryland {...rest} />;
        case 'MA':
            return <Massachusetts {...rest} />;
        case 'MI':
            return <Michigan {...rest} />;
        case 'MN':
            return <Minnesota {...rest} />;
        case 'MS':
            return <Mississippi {...rest} />;
        case 'MO':
            return <Missouri {...rest} />;
        case 'MT':
            return <Montana {...rest} />;
        case 'NE':
            return <Nebraska {...rest} />;
        case 'NV':
            return <Nevada {...rest} />;
        case 'NH':
            return <NewHampshire {...rest} />;
        case 'NJ':
            return <NewJersey {...rest} />;
        case 'NM':
            return <NewMexico {...rest} />;
        case 'NY':
            return <NewYork {...rest} />;
        case 'NC':
            return <NorthCarolina {...rest} />;
        case 'ND':
            return <NorthDakota {...rest} />;
        case 'OH':
            return <Ohio {...rest} />;
        case 'OK':
            return <Oklahoma {...rest} />;
        case 'OR':
            return <Oregon {...rest} />;
        case 'PA':
            return <Pennsylvania {...rest} />;
        case 'RI':
            return <RhodeIsland {...rest} />;
        case 'SC':
            return <SouthCarolina {...rest} />;
        case 'SD':
            return <SouthDakota {...rest} />;
        case 'TN':
            return <Tennessee {...rest} />;
        case 'TX':
            return <Texas {...rest} />;
        case 'UT':
            return <Utah {...rest} />;
        case 'VT':
            return <Vermont {...rest} />;
        case 'VA':
            return <Virginia {...rest} />;
        case 'WA':
            return <Washington {...rest} />;
        case 'WV':
            return <WestVirginia {...rest} />;
        case 'WI':
            return <Wisconsin {...rest} />;
        case 'WY':
            return <Wyoming {...rest} />;
        default:
            return <div>({stateCode})</div>;
    }
};

export default StateIcon;
