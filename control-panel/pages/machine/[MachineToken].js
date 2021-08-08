import axios from "axios"
import styles from ".././../styles/MachineControlPanel.module.css"

const MachineControlPanel = (props) => {
  return (
    <div className={styles.Container}>
      {props.MachineExists === true? (
        <h1>Machine Name: {props.MachineName}</h1>
        ) : (
        <div><h1>MachineDoesen't exists in Database</h1></div>
      )}
    </div>
  )
}

const GetMachineFullData = async (MachineToken) => {
  const MachineData = await axios.get(`${process.env.BACKEND_URL}/manage-machines/get-all-machine-data/${MachineToken}`);

  if (MachineData.data.MachineExists === false) {
    return {
      IsError: false,
      MachineExists: false,
      MachineName: "",
      MachineIp: ""
    }
  }

  return {
    IsError: false,
    MachineExists: true,
    MachineName: MachineData.data.MachineName,
    MachineIp: MachineData.data.MachineIp
  }

}

MachineControlPanel.getInitialProps = async ({ req, res, query }) => {

  //* Check if is rendered client-side or server-side
  if (req) {

    const machineData = await GetMachineFullData(query.MachineToken)

    return {
      MachineExists: machineData.MachineExists,
      MachineName: machineData.MachineName,
    }
  } else {


    return {
      MachineName: query.MachineToken,
    }
  }
}


export default MachineControlPanel;