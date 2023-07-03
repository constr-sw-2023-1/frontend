export interface IProfessor {
    registration: string,
    name: string,
    bornDate: Date,
    admissionDate: Date,
    active: boolean,
    identification: IIdentification[]
}

export interface IIdentification {
    type: string,
    value: string
}