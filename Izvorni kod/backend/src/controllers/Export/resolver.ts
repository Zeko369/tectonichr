import { Ctx, Query, Resolver } from "type-graphql";
import { writeToString } from "@fast-csv/format";

import { GQLCtx } from "../../types";
import { Earthquake } from "../../models/Earthquake";

@Resolver()
export class ExportResolver {
  @Query(() => String)
  async exportEarthquakes(@Ctx() ctx: GQLCtx): Promise<string> {
    if (!ctx.user) {
      throw new Error("You are not logged in");
    }

    const earthquakes = await Earthquake.find({ loadRelationIds: true });

    const columns: {
      key: keyof Earthquake;
      mapper?: (row: Earthquake) => string;
      label?: string;
    }[] = [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "date", label: "Date" },
      { key: "epicenterLat", label: "Epicenter Latitude" },
      { key: "epicenterLng", label: "Epicenter Longitude" },
      {
        key: "surveys",
        mapper: (e) => e.surveys.length.toString(),
        label: "Number of surveys",
      },
    ];

    const data = [
      columns.map((c) => c.label),
      ...earthquakes.map((e) =>
        columns.map((c) => (c.mapper ? c.mapper(e) : e[c.key]))
      ),
    ];

    return writeToString(data);
  }
}
