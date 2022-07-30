import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

test("renders error message", () => {
  render(<ErrorMessage message="This is an error" />);
  // screen.debug();
  expect(screen.getByText("This is an error")).toBeDefined();
});
