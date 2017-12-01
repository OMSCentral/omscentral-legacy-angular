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
            semester: this.semester,
            rating: this.rating,
            text: this.text,
            workload: this.workload,
            difficulty: this.difficulty
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
