import { useState, useEffect } from "react";
import styles from "./style/NavBar.module.css";
import Link from "next/Link"
import Image from "next/image"
import axios from "axios"

import MachineTab from "./MachineTab"

export default function NavBar() {

    const [MachineList, setMachineList] = useState([])


    useEffect(() => {
        axios.get(`${process.env.SERVER_BACKEND}/machines-manager/get-machines`).then((res) => {
            setMachineList(res.data.machines)
        })
    }, [])

    return (
        <>
            <nav className={styles.UpNavBarBackground}>

                {MachineList.map((Machine, index) => (
                    <div key={index}>
                        <MachineTab
                            MachineName={Machine.MachineName}
                            MachineToken={Machine.MachineToken}
                        />
                    </div>
                ))}
                <Link href="/m/add-machine">
                    <button className={styles.AddMachineButton}>
                        <Image src={"/NavBar/add.svg"} width={20} height={20} />
                    </button>
                </Link>
            </nav>
        </>
    )
}