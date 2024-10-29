export interface SearchResult {
    positions: number[];
}

export class API {
    static async search(keyword: string, url: string): Promise<SearchResult> {
        const response = await fetch(`api/Search?Keyword=${encodeURIComponent(keyword)}&Url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`Failed to perform search: ${errorMessage}`);
        }

        return await response.json();
    }
}
