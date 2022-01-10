import { Field, Int, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { surveyQuestions } from "../data/surveyQuestions";
import { BaseModel } from "./BaseModel";
import { Survey } from "./Survey";

interface ISurveyResponse {
  questionId: string;
  optionId: string;
}

@ObjectType()
@Entity({ name: "survey_responses" })
export class SurveyResponse extends BaseModel implements ISurveyResponse {
  @Field(() => String)
  @Column()
  questionId: string;

  @Field(() => String)
  @Column()
  optionId: string;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.responses)
  survey: Survey;

  constructor(data?: ISurveyResponse) {
    super();

    if (data) {
      this.questionId = data.questionId;
      this.optionId = data.optionId;
    }
  }

  private getQuestion() {
    return surveyQuestions.find((q) => q.id === this.questionId);
  }

  private getOption() {
    return this.getQuestion()?.options.find((o) => o.id === this.optionId);
  }

  @Field(() => String)
  question(...args: any[]) {
    return this.getQuestion()?.text || "[no question]";
  }

  @Field(() => String)
  option() {
    return this.getOption()?.text || "[no option]";
  }

  @Field(() => String)
  intensity() {
    return this.getOption()?.intensity || "-1";
  }

  @Field(() => String, { nullable: true })
  optionLetter() {
    const optionIndex = this.getQuestion()?.options.findIndex(
      (o) => o.id === this.optionId
    );
    if (optionIndex === undefined || optionIndex === -1) {
      return undefined;
    }

    return String.fromCharCode(97 + optionIndex);
  }
}
