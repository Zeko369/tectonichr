import { Field, ObjectType } from "type-graphql";

let index = 1;
let questionIndex = 1;

@ObjectType()
export class SurveyOption {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  intensity: string;

  constructor(text: string, intensity: string) {
    this.id = `${index++}`;
    this.text = text;
    this.intensity = intensity;
  }
}

@ObjectType()
export class SurveyQuestion {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field(() => [SurveyOption])
  options: SurveyOption[];

  constructor(text: string, options: SurveyOption[]) {
    this.id = `${questionIndex++}`;
    this.text = text;
    this.options = options;
  }
}

export const surveyQuestions = [
  new SurveyQuestion("U zatvorenom prostoru potres su osjetili:", [
    new SurveyOption("nitko", "1"),
    new SurveyOption("pojedinci", "2"),
    new SurveyOption("mnogi", "3|4"),
    new SurveyOption("većina", "5"),
  ]),
  new SurveyQuestion("Na otvorenom potres su osjetili:", [
    new SurveyOption("nitko", "1"),
    new SurveyOption("pojedinci", "4"),
    new SurveyOption("mnogi", "4|5"),
    new SurveyOption("većina", ">=6"),
  ]),

  new SurveyQuestion("Mali predmeti (knjige, vaze, ...)", [
    new SurveyOption("se nisu tresli", "1"),
    new SurveyOption("su se tresli slabo", "3"),
    new SurveyOption("su se tresli umjereno", "4"),
    new SurveyOption("su se tresli jako", "4"),
    new SurveyOption("su se pomicali", "5"),
    new SurveyOption("su padali", "6"),
  ]),

  new SurveyQuestion("Prozori i vrata", [
    new SurveyOption("se nisu tresli", "2"),
    new SurveyOption("su se tresli", "3"),
    new SurveyOption("su zvečali", "4"),
    new SurveyOption("su udarali", "5"),
    new SurveyOption("su se otvarali i zatvarali", "5"),
    new SurveyOption("su se razbili", "6"),
  ]),

  new SurveyQuestion("Obješeni predmeti", [
    new SurveyOption("se nisu njihali", "1"),
    new SurveyOption("su se slabo njihali", "3"),
    new SurveyOption("su se umjereno njihali", "4"),
    new SurveyOption("su se jako njihali", "5"),
    new SurveyOption("su padali", "6"),
  ]),

  new SurveyQuestion("Usnule ljude potres", [
    new SurveyOption("nije budio", "1"),
    new SurveyOption("budio je pojedince", "4"),
    new SurveyOption("budio je mnoge", "5"),
    new SurveyOption("budio je većinu", ">=6"),
  ]),

  new SurveyQuestion("Jesu li ljudi bježali van za vrijeme potresa?", [
    new SurveyOption("ne", "1"),
    new SurveyOption("pojedinci", "5"),
    new SurveyOption("mnogi", "6"),
    new SurveyOption("većina", "7"),
  ]),

  new SurveyQuestion("Jesu li zvonila zvona?", [
    new SurveyOption("nisu", "1"),
    new SurveyOption("zvonila su mala zvona", "6"),
    new SurveyOption("zvonila su velika zvona", ">=7"),
  ]),

  new SurveyQuestion("Koliko se zgrada u Vašem mjestu posve srušilo?", [
    new SurveyOption("niti jedna", "1"),
    new SurveyOption("poneka", "8|9"),
    new SurveyOption("mnoge", "10"),
    new SurveyOption("većina", "11"),
    new SurveyOption("sve", "12"),
  ]),

  new SurveyQuestion("Je li pucala zemlja?", [
    new SurveyOption("je", ">=8"),
    new SurveyOption("nije", "1"),
  ]),
];
