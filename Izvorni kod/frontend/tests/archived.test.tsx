import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { me } from "../modules/Auth/graphql/me";
import ArchivedEarthquakesPage from "../modules/Earthquakes/pages/archived";

const mocks = [
  {
    request: { query: me },
    result: {
      data: {
        me: null,
      },
    },
  },
];

describe("Archived", () => {
  it("renders a loading", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ArchivedEarthquakesPage />
      </MockedProvider>
    );

    const heading = screen.getByText("Loading...");
    expect(heading).toBeInTheDocument();
  });
});
