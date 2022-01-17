import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";

test("Test Firstname", async () => {
  const { getByLabelText, getByTestId } = render(<App />);
  const input = getByLabelText("Firstname");
  fireEvent.blur(input);

  expect(getByTestId("firstNameError")).not.toBe(null);
  expect(getByTestId("firstNameError")).toHaveTextContent("Required");
});

test("Marital Status field exists", () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  fireEvent.click(getByTestId('select-countryOfWork'), { target: { value: "option-3" } });
  let options = getAllByTestId('select-option-countryOfWork');

  // options[3].selected = true;
  expect(getByTestId("label-maritalStatus").textContent).toBe("Marital Status");
});
