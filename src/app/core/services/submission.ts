import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  submissions: any[] = [];
  nextId: number = 1;

  addSubmission(data: any) {
    const submission = {
      id: this.nextId++,
      ...data,
    };

    this.submissions.push(submission);
  }

  getSubmissions() {
    return this.submissions;
  }

  deleteSubmission(id: number) {
    const index = this.submissions.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.submissions.splice(index, 1);
    }
  }
}
