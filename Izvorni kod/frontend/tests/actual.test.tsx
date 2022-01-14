import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { me } from "../modules/Auth/graphql/me";
import ActualEarthquakesPage from "../modules/Earthquakes/pages/actual";

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

describe("Actual", () => {
  it("renders a heading", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ActualEarthquakesPage />
      </MockedProvider>
    );

    const heading = screen.getByText("Loading...");
    expect(heading).toBeInTheDocument();
  });
});
