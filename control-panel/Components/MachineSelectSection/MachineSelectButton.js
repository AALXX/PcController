import { useRouter } from 'next/router'
import styles from "./style/MachineSelectButton.module.css";
import { useState, useEffect } from "react"
import axios from "axios"


const MachineSelectButton = (props) => {

    return (
        <div>
            <button className={styles.ButtonContainer}>
                <h1 className={styles.MachineNameText}>{props.MachineName}</h1>
            </button>
        </div>
    );
}

export default MachineSelectButton;
