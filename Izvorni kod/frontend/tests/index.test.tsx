import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { Navigation } from "../components/Navigation";
import { me } from "../modules/Auth/graphql/me";

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

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Navigation />
      </MockedProvider>
    );

    const heading = screen.getByRole("heading", {
      name: /TECTONIC HR/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
