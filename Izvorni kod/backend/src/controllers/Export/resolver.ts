import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import { writeToString } from "@fast-csv/format";

import { GQLCtx } from "../../types";
import { Earthquake } from "../../models/Earthquake";
import { UserRole } from "../../models/User";
import { Survey } from "../../models/Survey";
import { surveyQuestions } from "../../data/surveyQuestions";

@Resolver()
export class ExportResolver {
  private formatData(item: any) {
    if (typeof item.getTime === "function") {
      return (item as Date).toJSON();
    }

    return item;
  }

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
        columns.map((c) => this.formatData(c.mapper ? c.mapper(e) : e[c.key]))
      ),
    ];

    return writeToString(data);
  }

  @Query(() => String)
  async exportEarthquake(
    @Ctx() ctx: GQLCtx,
    @Arg("id", () => Int) id: number,
    @Arg("full", () => Boolean, { nullable: true }) full?: boolean
  ): Promise<string> {
    if (!ctx.user) {
      throw new Error("You are not logged in");
    }

    const earthquake = await Earthquake.findOne(id, {
      relations: ["surveys", "surveys.responses"],
    });
    if (!earthquake) {
      throw new Error("Earthquake not found");
    }

    const columns: {
      key: keyof Earthquake;
      label: string;
    }[] = [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "date", label: "Date" },
      { key: "epicenterLat", label: "Epicenter Latitude" },
      { key: "epicenterLng", label: "Epicenter Longitude" },
    ];

    const surveyColumns: {
      key: keyof Survey;
      label: string;
    }[] = [
      { key: "id", label: "Survey ID" },
      { key: "createdAt", label: "Survey Date" },
      { key: "lat", label: "Survey Latitude" },
      { key: "lng", label: "Survey Longitude" },
    ];

    const header = [
      ...columns.map((c) => c.label),
      ...surveyColumns.map((c) => c.label),
      ...(full
        ? surveyQuestions
            .map((q) => [`Question ${q.id}`, `Option ${q.id}`])
            .flat()
        : ["results"]),
    ];

    const data = [
      header,
      ...earthquake.surveys.map((s) => [
        ...columns.map((c) => this.formatData(earthquake[c.key])),
        ...surveyColumns.map((c) => this.formatData(s[c.key])),
        ...(full
          ? surveyQuestions
              .map((q) => {
                const response = s.responses.find((r) => r.questionId === q.id);
                if (response) {
                  return [response.id, response.optionId];
                }
                return ["", ""];
              })
              .flat()
          : [
              s.responses
                .map((r) => `${r.questionId}->${r.optionLetter()}`)
                .join(","),
            ]),
      ]),
    ];

    return writeToString(data as any);
  }

  @Query(() => String)
  async exportQuestions(): Promise<string> {
    const longestQuestion = surveyQuestions
      .map((sq) => sq.options.length)
      .sort((a, b) => b - a)[0];

    const header = [
      "QuestionID",
      "Question",
      ...Array.from(new Array(longestQuestion), (_, i) => [
        `Option ${i + 1} ID`,
        `Option ${i + 1} Text`,
        `Option ${i + 1} Intensity`,
      ]).flat(),
    ];

    const data = [
      header,
      ...surveyQuestions.map((q) => [
        q.id,
        q.text,
        ...q.options.map((opt) => [opt.id, opt.text, opt.intensity]).flat(),
      ]),
    ];

    return writeToString(data as any);
  }
}
