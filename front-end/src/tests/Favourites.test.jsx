import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Favourites from "../components/Favourites";
import mockFavouritesData from "./mockFavouritesData";

describe("Favourites component test suite", () => {
  beforeEach(() => {
    localStorage.setItem("myLocationFavourites", JSON.stringify(mockFavouritesData));
    render(<Favourites currentFavourites={mockFavouritesData} />, { wrapper: MemoryRouter });
  });

  describe("render tests", () => {
    it("should display a list of favourites fetched from local storage", () => {
      const faveItems = screen.getAllByTestId("fave-filled");
      const faveBtns = screen.getAllByRole("button");
      expect(faveItems.length).toBe(5);
      expect(faveBtns.length).toBe(5);
    });

    it("should display a message indicating the user has no favourites if none are found in local storage", () => {
      cleanup();
      localStorage.clear();
      render(<Favourites />, { wrapper: MemoryRouter });
      expect(screen.getByText(/You Have No Favourites Yet!/i)).toBeInTheDocument();
    });
  });

  describe("functional tests", () => {
    it("should show a fave-no-fill element after the a button is clicked", async () => {
      const faveBtns = screen.getAllByRole("button");
      await userEvent.click(faveBtns[0]);
      expect(screen.getByTestId("fave-no-fill")).toBeInTheDocument();
    });
  });
});
