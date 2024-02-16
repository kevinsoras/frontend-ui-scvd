// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import UploadPage from "../routes/UploadPage/UploadPage";
import { unparse } from "papaparse";
describe("Upload Page", () => {
  test("UploadPage renders correctly", () => {
    render(<UploadPage />);
    const choseFileButton = screen.getByText("Chose File");
    const uploadFileButton = screen.getByText("Upload File");

    if (!choseFileButton || !uploadFileButton) {
      throw new Error("Botones no encontrados");
    }

    // Verificar que los botones tengan el texto correcto
    expect(choseFileButton.textContent).toBe("Chose File");
    expect(uploadFileButton.textContent).toBe("Upload File");
  });

  test("Selecting a file updates the displayed file name",async () => {
    const { container } = render(<UploadPage />);
    const fileInput = container.querySelector("input[type=file]");

    if (!fileInput) {
      throw new Error("File input not found");
    }
    // Simular seleccionar un archivo
    const csv = unparse([
      { name: "kevin", email: "kevinsoras@gmail.com", age: 2 },
      { name: "kevin", email: "kevinsorasgmail.com"},
      {  email: "stela@gmail.com",age:24},
    ]);
    const blob = new Blob([csv], { type: "text/csv" });
    const file = new File([blob], "send.csv", { type: "text/csv" });
    await userEvent.upload(fileInput, file);
    const fileChosen = screen.getAllByTestId("name-file-chosen");

    expect(fileChosen[fileChosen.length-1].textContent).toBe("send.csv");

  });

});
