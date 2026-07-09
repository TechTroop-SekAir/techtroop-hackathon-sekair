import { makeAutoObservable } from 'mobx';

class NewSurveyStore {
    title = '';
    isAnonymous = false;
    questions = [{ 
        question_text: '', 
        options: ['', '', '', '']
    }];

    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle(title) {
        this.title = title;
    }

    setIsAnonymous(value) {
        this.isAnonymous = value;
    }

    addQuestion() {
        this.questions.push({ 
            question_text: '', 
            options: ['', '', '', ''] 
        });
    }

    removeQuestion(index) {
        if (this.questions.length > 1) {
        this.questions.splice(index, 1);
        }
    }

    updateQuestionText(index, text) {
        this.questions[index].question_text = text;
    }

    updateOptionText(questionIndex, optionIndex, text) {
        this.questions[questionIndex].options[optionIndex] = text;
    }

    async submitSurvey() {
        this.isLoading = true;
        this.error = null;

        const surveyPayload = {
        title: this.title,
        is_anonymous: this.isAnonymous,
        questions: this.questions
        };

        console.log('Sending payload to mock service:', surveyPayload);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            this.resetForm();
            return true;
        } 
        catch (err) {
            this.error = 'Failed to create survey. Please try again.';
            return false;
        } 
        finally {
            this.isLoading = false;
        }
    }

    resetForm() {
        this.title = '';
        this.isAnonymous = false;
        this.questions = [{ question_text: '', options: ['', '', '', ''] }];
    }
}

export const newSurveyStore = new NewSurveyStore();