export interface PastMedicalConcern {
    pastIllnesses: string,
    hospitalizations: [ {
        date: Date,
        reason: string,
    } ],
    surgeries: [ {
        date: Date,
        surgeryType: string,
    } ],
    allergies: [ {
        type: string,
        reaction: string,
    } ],
    medications: [ {
        medicine: string,
        dose: string,
        occurence: string,
    } ],
    lifestyle: [ {
        name: string,
        occurence: string,
    } ],
}