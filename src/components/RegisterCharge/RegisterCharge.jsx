import { Fragment, useRef, useState } from "react";
import styles from "./styles.module.css";
import { unparse } from "papaparse";
import { uploadFile } from "../../services";

function RegisterCharge({ initialData }) {
  const fileInputRef = useRef(null);

  const [listErrors, setListErrors] = useState(initialData.errors);
  const [listSuccess, setListSuccess] = useState(initialData.success);
  const messageSucces = `${listSuccess.length} records uploades succesfully`;
  const messageError = `The (${listErrors.length}) records listed below ecountered errors. Please rectify the issues and retry`;
  // Función para manejar cambios en los valores del formulario
  const handleInputChange = (event, index, key) => {
    const newListErrors = [...listErrors];
    newListErrors[index].data[key] = event.target.value;
    setListErrors(newListErrors);
  };
  const handleSendRow = async (index) => {
    const errorData = listErrors[index];
    // Convertir el objeto a un archivo File
    const csv = await unparse([errorData.data]);
    const blob = new Blob([csv], { type: "text/csv" });
    const file = new File([blob], "send.csv", { type: "text/csv" });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadFile(formData);
      if (data.success.length > 0) {
        setListSuccess([...listSuccess, data.success[0]]);
        const newListError = listErrors.filter(
          (error) => errorData.row !== error.row
        );
        setListErrors(newListError);
      }
      if (data.errors.length > 0) {
        const updateError = data.errors[0];
        const newListError = listErrors.map((error,i) => {
          if (i == index) return {...updateError,row:errorData.row};
          return error;
        });
        setListErrors(newListError);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectFile = async(event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadFile(formData);
      setListSuccess(data.success);
      setListErrors(data.errors)
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendFile = async () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  }
  return (
    <>
      <div className={styles.section}>
        <div className={styles["section-edit"]}>
          <div className={styles["message-box"]}>
            <div className={styles["message-succes"]}>
              <span></span>
              <div>{messageSucces}</div>
            </div>
          </div>

          {listErrors.length > 0 && (
            <div className={styles["section-table"]}>
              <div>{messageError}</div>
              <div className={styles.table}>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Row</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listErrors.map((row, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{row.row}</td>
                          <td>
                            <input
                              className={`${
                                row.details.name && styles["input-error"]
                              } ${styles.input}`}
                              type="text"
                              value={row.data.name || ""}
                              onChange={(event) =>
                                handleInputChange(event, index, "name")
                              }
                            />
                            <p
                              className={`${
                                row.details.name && styles["message-error"]
                              }`}
                            >
                              {row.details.name}
                            </p>
                          </td>
                          <td>
                            <input
                              className={`${
                                row.details.email && styles["input-error"]
                              } ${styles.input} `}
                              type="email"
                              value={row.data.email || ""}
                              onChange={(event) =>
                                handleInputChange(event, index, "email")
                              }
                            />
                            <p
                              className={`${
                                row.details.email && styles["message-error"]
                              }`}
                            >
                              {row.details.email}
                            </p>
                          </td>
                          <td>
                            <input
                              className={`${
                                row.details.age && styles["input-error"]
                              } ${styles.input}`}
                              type="text"
                              value={row.data.age || ""}
                              onChange={(event) =>
                                handleInputChange(event, index, "age")
                              }
                            />
                            <p
                              className={`${
                                row.details.age && styles["message-error"]
                              }`}
                            >
                              {row.details.age}
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() => handleSendRow(index)}
                              className={styles["button-retry"]}
                              type="button"
                            >
                              Retry
                            </button>
                          </td>
                        </tr>
                        {row.details.insertion && (
                          <tr>
                            <td
                              style={{ color: "hsl(263, 62%, 60%)" }}
                              colSpan="5"
                            >{`${row.details.insertion} (Email)`}</td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className={styles["section-upload"]}>
        <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleSelectFile}
              />
          <button onClick={handleSendFile} className={styles["button-new-file"]}>New File</button>
        </div>
      </div>
    </>
  );
}
export default RegisterCharge;
