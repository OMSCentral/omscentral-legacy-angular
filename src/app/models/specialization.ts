export class Specialization {
  name: string;
  short: string;
  choices: Choice[];

  constructor(name, short, choices) {
    this.name = name;
    this.short = short;
    this.choices = choices;
  }

  contains(course) {
    return (
      this.choices.filter(choice => {
        return choice.courses.indexOf(course) !== -1;
      }).length !== 0
    );
  }

  progress(courses) {
    let required = 0;
    this.choices.forEach(choice => {
      required = required + choice.progress(courses);
    });
    return required / this.choices.length;
  }
}

export class Choice {
  amount: number;
  courses: string[];

  constructor(amount, courses) {
    this.amount = amount;
    this.courses = courses;
  }

  progress(courses) {
    let progress =
      this.courses.filter(course => {
        return courses.indexOf(course) !== -1;
      }).length / this.amount;
    return progress > 1.0 ? 1.0 : progress;
  }
}
