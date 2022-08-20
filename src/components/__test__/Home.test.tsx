import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Home from "../Home";
describe("Test Home Component", () => {
  test("render homeUI", async () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: "voting site" });
    const button = screen.getByRole("link", { name: "始める" });

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
