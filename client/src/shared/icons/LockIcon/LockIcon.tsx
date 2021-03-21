import React from 'react'
import { IconProps } from '../propInterface'

const LockIcon = ({fill}: IconProps) => {
    const pathFill = fill ? fill : 'var(--color-primary-dark)'

    return (
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0.9375C5.29688 0.9375 4.64062 1.11914 4.03125 1.48242C3.43359 1.83398 2.95312 2.31445 2.58984 2.92383C2.23828 3.52148 2.0625 4.17188 2.0625 4.875V6.5625H0.375V15.5625H11.625V6.5625H9.9375V4.875C9.9375 4.17188 9.75586 3.52148 9.39258 2.92383C9.04102 2.31445 8.56055 1.83398 7.95117 1.48242C7.35352 1.11914 6.70312 0.9375 6 0.9375ZM6 2.0625C6.50391 2.0625 6.97266 2.19141 7.40625 2.44922C7.83984 2.69531 8.17969 3.03516 8.42578 3.46875C8.68359 3.90234 8.8125 4.37109 8.8125 4.875V6.5625H3.1875V4.875C3.1875 4.37109 3.31055 3.90234 3.55664 3.46875C3.81445 3.03516 4.16016 2.69531 4.59375 2.44922C5.02734 2.19141 5.49609 2.0625 6 2.0625ZM1.5 7.6875H10.5V14.4375H1.5V7.6875Z" 
                fill={pathFill}
            />
        </svg>
    )
}

export default LockIcon
