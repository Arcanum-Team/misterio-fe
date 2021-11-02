import React, { Component } from "react";
import Portal from "./Portal";

export default class Modal extends Component {
    render() {

        const {children, active} = this.props;

        return (
            <Portal>
                {active && (
                    <div style = {styles.wrapper}>
                        <div style = {styles.window}>
                            <div>{children}</div>
                        </div>
                        <div style={styles.background}></div>
                    </div>
                )}
            </Portal>
        )
    }
}

const styles = {
    wrapper:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    window:{
        position: 'relative',
        background: '#fff',
        borderRadius: 5,
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        zIndex: 10,
        minWidth: 320,
    },
    background:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: '#000',
        opacity: 0.6,

    }
};