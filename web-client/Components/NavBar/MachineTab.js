import React from 'react'
import styles from "./style/MachineTab.module.css";
import Link from "next/Link"

export default function MachineTab(props) {
    return (
        <>
            <Link href={`/m/${props.MachineToken}`}>
                <button className={styles.TabContainer}>
                    <h1 className={styles.MachineNameText}>{props.MachineName}</h1>
                </button>
            </Link>
        </>
    )
}
