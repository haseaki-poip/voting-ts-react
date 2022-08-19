import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./components/Home";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/始める/i);
  expect(linkElement).toBeInTheDocument();
});
