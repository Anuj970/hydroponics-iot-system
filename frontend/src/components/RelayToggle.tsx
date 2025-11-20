import React, { useState } from 'react';
import { toggleRelay } from '../services/api';

const RelayToggle: React.FC = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = async () => {
        const newState = !isOn;
        setIsOn(newState);
        await toggleRelay(newState);
    };

    return (
        <div>
            <h2>Relay Control</h2>
            <button onClick={handleToggle}>
                {isOn ? 'Turn Off' : 'Turn On'}
            </button>
        </div>
    );
};

export default RelayToggle;