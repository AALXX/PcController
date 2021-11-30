import styles from '../../styles/AddMachine.module.css'
import { useState } from 'react'
import axios from 'axios';
import Router from "next/router";

export default function AddMachine() {

    const [MachineOs, setMachineOs] = useState("Windows");

    const SubmitMachine = (e) => {
        e.preventDefault();

        axios.post(`${process.env.SERVER_BACKEND}/machines-manager/add-machine`, {MachineName: e.target.MachineName.value, MachineOs:MachineOs, MachineIp:e.target.MachineIp.value}).then((res) => {
            if (res.data.error) { return window.alert("Error") }

            Router.reload(window.location.pathname);

        })
    }

    return (
        <div className={styles.PageCotnainer}>
            <form onSubmit={SubmitMachine}>
                <div className={styles.AddMachineCard}>
                    <h1 className={styles.AddMachineText}>Add Machine</h1>
                    <hr color="#676767" className={styles.Bar} />

                    <div className={styles.MachineNamePart}>
                        <h1 className={styles.NameText}>Name:</h1>
                        <input className={styles.MachineNameInput}
                            type="text"
                            placeholder="Machine Name..."
                            name="MachineName"
                            required
                        />
                    </div>

                    <div className={styles.MachineIpPart}>
                        <h1 className={styles.MachineIpText}>Ip</h1>
                        <input className={styles.MachineIpInput}
                            type="text"
                            placeholder="Machine Ip..."
                            name="MachineIp"
                            required
                        />
                    </div>

                    <div className={styles.MachineOsPart}>
                        <h1 className={styles.MachineOsText} >Machine Os </h1>
                        <select name="videoVisibility" className={styles.MachineOsSelect} onChange={(e) => setMachineOs(e.target.value)}>
                            <option value="Windows">Windows</option>
                            <option value="Linux">Linux</option>
                            <option value="MacOs">MacOs</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <hr color="#676767" className={styles.BottomBar} />
                    <div className={styles.FooterCardContainer}>
                        <input className={styles.AddMachineButton} type="submit" value="Add Machine" />
                    </div>
                </div>
            </form>
        </div>
    )
}
