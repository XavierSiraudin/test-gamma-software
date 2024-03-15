export interface Band
{
    id: number;
    name?: string;
    country?: string;
    city?: string;
    startingYear?: number;
    separationYear?: number;
    founders?: string;
    membersCount?: number;
    musicalStyle?: string;
    description?: string;
}

export const BAND_MOCK: Band = {
    id: 0,
    name: 'Angular Unit Tests',
    country: 'France',
    city: 'Lyon',
    startingYear: 2024,
    founders: 'Xavier Siraudin',
    membersCount: 1,
    musicalStyle: 'Full Stack',
    description: 'Hello, World!',
}
