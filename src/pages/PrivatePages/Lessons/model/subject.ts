import { Lesson } from "./lesson";
import { Type } from "./type";

export interface Subject {
    uuid: string;
    name: string;
    lesson: Lesson;
    type: Type;
    active: boolean;
}