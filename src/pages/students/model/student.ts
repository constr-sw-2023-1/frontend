export interface Student {
    student_id?: number | string;
    name: string;
    registration: number | string;
    course: string;
    email?: string;
    enabled: boolean;
}