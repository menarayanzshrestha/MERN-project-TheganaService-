import React from 'react';
import { Button } from "semantic-ui-react";

import styles from './button.module.scss';

const MyButton  = (props) => {

    const { primary, content, secondary, transparent, onClick, className, small, tiny, responsive, reduce, loading } = props;

    if(primary) {
        return <Button 
                    onClick={onClick} 
                    className={[
                        styles.primary, 
                        styles.button, 
                        className, 
                        small ? styles.small : '', 
                        tiny ? styles.tiny : '', 
                        responsive ? styles.responsive : '',
                        reduce ? styles.reduce : ''
                    ]} 
                    content={content} 
                    loading={loading}
                />
    }
    else if(secondary) {
        return <Button 
                    onClick={onClick} 
                    className={[
                        styles.secondary, 
                        styles.button, 
                        className, 
                        small ? styles.small : '', 
                        tiny ? styles.tiny : '', 
                        responsive ? styles.responsive : '',
                        reduce ? styles.reduce : ''
                    ]} 
                    content={content} 
                    loading={loading}
                />
    }
    else if(transparent){
        return <Button 
                    onClick={onClick} 
                    className={[
                        styles.transparent, 
                        styles.button, 
                        className, 
                        small ? styles.small : '', 
                        tiny ? styles.tiny : '', 
                        responsive ? styles.responsive : '',
                        reduce ? styles.reduce : ''
                    ]} 
                    content={content} 
                    loading={loading}
                />
    }

}

export default MyButton;