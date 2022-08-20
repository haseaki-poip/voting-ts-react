import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Content from "../forms/Content";

describe("Test Content Component", () => {
  test("render contentUI", async () => {
    render(<Content />);
    const textarea = screen.getAllByRole("textbox");

    expect(textarea).toHaveLength(1);
  });
});
