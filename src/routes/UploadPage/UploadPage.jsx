import { redirect } from "react-router-dom";
import { authProvider } from "../../auth";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import { uploadFile } from "../../services";
import RegisterCharge from "../../components/RegisterCharge/RegisterCharge";

export async function load() {
  try {
    const dataJwt = await authProvider.getTokenData();
    if (dataJwt.role === "admin") {
      return {};
    }
    await authProvider.logout();
    alert("Esta pagina es solo para usuarios Admin :/");
    return redirect("/login");
  } catch (error) {
    return redirect("/login");
  }
}

function UploadPage() {
  const fileInputRef = useRef(null);
  const file = useRef(null);
  const [changeToRegister, setChangeToRegister] = useState(null);
  const [message, setMessage] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };
  const handleFileChange = async(event) => {
    file.current = null;
    setMessage(event.target.files[0].name);
    file.current = event.target.files[0];
  };
  const handleUpload = async () => {
    if (file.current) {
      try {
        const formData = new FormData();
        formData.append("file", file.current);
        const data = await uploadFile(formData);
        setChangeToRegister(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className={styles.section}>
        <div className={styles.title}>
          <h1>Sistema de Carga de Datos</h1>
        </div>
        <div className={styles.container}>
          {changeToRegister ? (
            <RegisterCharge initialData={changeToRegister}/>
          ) : (
            <div className={styles["box-container"]}>
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <h1>Seleccionar un archivo de carga</h1>
              <div className={styles["box-upload"]}>
                <button
                  className={styles["button-upload"]}
                  onClick={handleButtonClick}
                >
                  Chose File
                </button>
                <p className={styles["box-upload-message"]}>
                  {message == "" ? "No file chosen" : message}
                </p>
              </div>
              <hr />
              <button
                className={styles["button-upload"]}
                onClick={handleUpload}
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default UploadPage;
