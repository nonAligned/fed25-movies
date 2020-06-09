import { Movie } from './movie.model';
export class MovieList {
    count: number;
    results: Movie[];

    constructor(obj?: any) {
        this.count = obj && obj.count || null;
        this.results = obj && obj.results || null;
    }
}