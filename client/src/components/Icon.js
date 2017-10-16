import React from 'react';
import { Row } from 'jsxstyle';

const Icon = ({name, ...props}) => (
    <Row
        backgroundImage={`url(../../public/assets/icons/${name}.svg)`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"  
        backgroundPosition="center center"
        width={20}
        height={20}
        marginRight={7}
        component="span"
        {...props}
    />
);

export default Icon;
