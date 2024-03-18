import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchResult from "../components/SearchResult";
import mockWeatherData from "./mockWeatherData";
import sinon from "sinon";
import { vi } from "vitest";

vi.mock("../components/Map", () => ({
  default: vi.fn(),
}));

describe("SearchResult test suite", () => {
  beforeEach(() => {
    render(<SearchResult weatherData={mockWeatherData} />, { wrapper: MemoryRouter });
  });

  describe("SearchResult render tests", () => {
    it("should render the name of the location from the weatherData", () => {
      expect(screen.getByText(/london/i)).toBeInTheDocument();
    });

    it("should show an add to favourites icon", () => {
      expect(screen.getByText(/add to favourites/i)).toBeInTheDocument();
    });

    it("should show a weather-today card with accurate info", () => {
      expect(screen.getByTestId("weather-today-card")).toBeInTheDocument();
      expect(screen.getByText(/2024-02-29/i)).toBeInTheDocument();
      expect(screen.getByText(/8.06/i)).toBeInTheDocument();
      expect(screen.getByText(/moderate rain/i)).toBeInTheDocument();
      expect(screen.getByAltText(/moderate rain/i)).toBeInTheDocument();
    });

    it("should show 4 weather cards for future days with relevant info", () => {
      const cards = screen.getAllByTestId("weather-card");
      expect(cards.length).toBe(4);
      expect(screen.getByText(/2024-03-04/i)).toBeInTheDocument();
      expect(screen.getByText(/7.89/i)).toBeInTheDocument();
      expect(screen.getByText(/broken clouds/i)).toBeInTheDocument();
      expect(screen.getByAltText(/overcast clouds/i)).toBeInTheDocument();
    });
  });

  describe("SearchResults functional tests", () => {
    it("should show the fave-filled element after clicking on the favourite icon and go back after clicking again", async () => {
      const faveBtn = screen.getByTestId("fave-no-fill");
      await userEvent.click(faveBtn);
      expect(screen.getByText(/remove from favourites/i)).toBeInTheDocument();

      const unfaveBtn = screen.getByTestId("fave-filled");
      await userEvent.click(unfaveBtn);
      expect(screen.getByText(/add to favourites/i)).toBeInTheDocument();
    });

    it("should add the name of the given location to the myLocationFavourites in local storage", async () => {
      const faveBtn = screen.getByTestId("fave-no-fill");
      await userEvent.click(faveBtn);
      const storage = JSON.parse(localStorage.getItem("myLocationFavourites"));
      expect(storage.length).toBe(1);
    });

    it("should call localStorage.getItem/setItem", async () => {
      const getSpy = sinon.spy(Storage.prototype, "getItem");
      const setSpy = sinon.spy(Storage.prototype, "setItem");
      const faveBtn = screen.getByTestId("fave-no-fill");
      await userEvent.click(faveBtn);
      expect(getSpy.calledWith("myLocationFavourites")).toBe(true);
      expect(setSpy.calledWith("myLocationFavourites")).toBe(true);
      getSpy.restore();
      setSpy.restore();
    });
  });
});
