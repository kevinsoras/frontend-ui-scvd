import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import styles from "./styles.module.css";
import { authProvider } from "../../auth";

export async function action({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  try {
    await authProvider.login(email, password);
    let redirectTo = formData.get("redirectTo");
    return redirect(redirectTo || "/");

  } catch (error) {
    let errorMessage = "Invalid login attempt";
    if (error.error) errorMessage = error.error.message;
    return {
      error: errorMessage,
    };
  }
}

function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  

  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className={styles.container}>
        
        <h1 className={styles.title}>Sistema de Carga de Datos</h1>
        <Form className={styles.form} method="POST">

          <div className={styles["input-group"]}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              name="email"
              required
              className={styles.input}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              autoComplete=""
              id="password"
              type="password"
              name="password"
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entering..." : "Login"}
          </button>
          {actionData?.error && (
            <p className={styles.error}>{actionData.error}</p>
          )}
        </Form>
        
      </div>
    </>
  );
}
export default Login;
