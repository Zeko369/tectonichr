import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { me } from "../modules/Auth/graphql/me";
import ArchivedEarthquakesPage from "../modules/Earthquakes/pages/archived";
import { earthquakes } from "../modules/Admin/Earthquakes/graphql/earthquakes";

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

const earthquakesMock = {
  request: { query: earthquakes, variables: { archived: true } },
  result: {
    data: {
      earthquakes: [],
    },
  },
};

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
