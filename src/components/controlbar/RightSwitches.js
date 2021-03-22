/*
 * RightSwitches
 */

import React from 'react';
import { useTab } from "components/tab/Tab";
import { Button, ButtonGroup } from '@material-ui/core';
import getIcon from 'models/icon/Icon';

const Switches = () => {
    const tabContext = useTab(),
          tab = tabContext.tab,
          setTab = tabContext.setTab;

    return (
        <ButtonGroup aria-label="Scanning Switches">
            <Button
                color="primary"
                variant="text"
                onClick={() => setTab(tab === 0 ? 1 : 0)}
                endIcon={tab === 0 ? getIcon("ToggleOn") : getIcon("ToggleOff")}
            >
                Skanna
            </Button>
        </ButtonGroup>
    )
}

export default Switches;