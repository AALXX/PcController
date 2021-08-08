import { useRouter } from 'next/router'
import styles from "./style/NavBar.module.css";
import { useState, useEffect } from "react"
import axios from "axios"

import MachineSelectButton from "../MachineSelectSection/MachineSelectButton"

const NavBar = () => {

    const router = useRouter()
    const [MachinesList, setMachinesList] = useState([]);


    useEffect(() => {
        try {
            //* fetch Machines from Api
            axios.get(`${process.env.BACKEND_URL}/manage-machines/get-machine-name`).then((res) => {                
                let tmpMachinesList = [];

                for (let index = 0; index < res.data.MachineNames.length; index++) {

                    tmpMachinesList.push(res.data.MachineNames[index].MachineName)
                }   
                setMachinesList(tmpMachinesList)
            })

        } catch (error) {
            console.log("there was a problem")
        }

    }, [])

    return (
        <div className={styles.NavBarBackGround}>
            <h1 className={styles.LogoText}>PC Controller</h1>
            <div className={styles.DisplayMachinesDiv}>
                {MachinesList.map((Machine, index) => (
                    <div key={index}>
                        <MachineSelectButton 
                            MachineName={Machine}
                       />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NavBar;