export class Review {
    id: string = null;
    author: string;
    course: string;
    created: Date = null;
    difficulty: number;
    rating: number;
    semester: string;
    text: string;
    updated: Date;
    workload: number;
    program: string;
    proctortrack: string;
    firstCourse: string;
    previousClasses: number;
    projects: number;
    groupProjects: number;
    tests: number;
    extraCredit: string;
    moneySpent: number;
    frontLoad: string;
    proctorTrack: string;

    editReview = false;

    backup: Review = null;

    constructor(review: object) {
        Object.assign(this, review);
    }

    get isNew() {
        return this.id === null;
    }

    get isEdit() {
        return this.editReview;
    }

    edit() {
        this.backup = new Review(this);
        this.editReview = true;
        return {
            course: this.course || '',
            semester: this.semester || '',
            rating: this.rating || '',
            text: this.text || '',
            workload: this.workload || '',
            difficulty: this.difficulty || '',
            program: this.program || '',
            proctorTrack: this.proctorTrack || '',
            firstCourse: this.firstCourse || '',
            previousClasses: this.previousClasses || '',
            projects: this.projects || '',
            groupProjects: this.groupProjects || '',
            tests: this.tests || '',
            extraCredit: this.extraCredit || '',
            moneySpent: this.moneySpent || '',
            frontLoad: this.frontLoad || ''
        };
    }

    update(updatedValues) {
        Object.assign(this, updatedValues);
    }

    save(savedValues) {
        this.update(savedValues);
        this.backup = null;
        this.editReview = false;
    }

    cancel() {
        Object.assign(this, this.backup);
        this.backup = null;
        this.editReview = false;
    }
}
