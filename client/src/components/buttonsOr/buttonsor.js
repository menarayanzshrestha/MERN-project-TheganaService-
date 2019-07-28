import React from 'react';
import Button from '../button/button';

import styles from './buttonsor.module.scss';
import { Responsive } from 'semantic-ui-react';

const ButtonsOr = (props) => (

    <>

        {
            props.shouldReduce ? 
                <>
                    <Responsive minWidth={768}>
                        <div className={`${styles.buttonsOrWrapper}`}>
                            <Button small={props.small} tiny={props.tiny} transparent content={props.firstCondition} onClick={props.onClickFirst} />
                            {/* <div className={`${styles.divider} ${props.small ? styles.small : ''}`} ></div> */}
                            <Button small={props.small} tiny={props.tiny} transparent content={props.secondCondition} onClick={props.onClickSecond} />
                        </div>
                    </Responsive>

                    <Responsive {...Responsive.onlyMobile}>
                        <Button reduce small={props.small} tiny={props.tiny} transparent content={props.secondCondition} onClick={props.onClickSecond} />
                    </Responsive>
                </>
                :
                <div className={`${styles.buttonsOrWrapper}`}>
                    <Button small={props.small} tiny={props.tiny} transparent content={props.firstCondition} onClick={props.onClickFirst} />
                    {/* <div className={`${styles.divider} ${props.small ? styles.small : ''}`} ></div> */}
                    <Button small={props.small} tiny={props.tiny} transparent content={props.secondCondition} onClick={props.onClickSecond} />
                </div>
        }
    </>

)

export default ButtonsOr;