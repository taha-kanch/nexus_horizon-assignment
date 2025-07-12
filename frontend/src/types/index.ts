export interface Course {
    id: string;
    title: string;
    description: string;
    level: 'BIGINNER' | 'INTERMADIATE' | 'ADVANCED';
}