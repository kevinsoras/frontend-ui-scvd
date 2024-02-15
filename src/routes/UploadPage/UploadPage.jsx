import { redirect } from "react-router-dom";
import { authProvider } from "../../auth";
import styles from "./styles.module.css";

export async function load() {
  try {
    const dataJwt = await authProvider.getTokenData();
    if (dataJwt.role === "admin") {
      return {};
    }
    await authProvider.logout()
    alert("Esta pagina es solo para usuarios Admin :/")
    return redirect("/login");
  } catch (error) {
    return redirect("/login");
  }
}

function UploadPage() {

  return (
    <>
      <div className={styles.container}>asdas</div>
    </>
  );
  
}
export default UploadPage;
