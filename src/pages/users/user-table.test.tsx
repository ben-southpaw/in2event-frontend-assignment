import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import UsersPage from "./users-page";

test("UsersPage", () => {
  render(<UsersPage />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Users List" })
  ).toBeDefined();
});
