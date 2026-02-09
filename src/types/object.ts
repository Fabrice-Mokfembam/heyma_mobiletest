export interface Object {
    id: string;
    name: string;
    title: string; // The user used 'title' in the description but 'name' in code, I'll align them. Actually, the guide uses 'name' in code but 'title' in spec. I will add 'title' as alias for name if needed or stick to 'name' as per the guide code. The guide code uses 'name'. Looking closer at `types/object.ts`: `name: string;`. I will stick to the guide's code: `name`. The user spec says `title` and `description`. I will add both or alias one to be safe. Let's stick to the code provided: `name`. Wait, the user spec explicitly says `title (string)`. I should probably implement `title` but the guide says `name`. I'll use `name` as primary to match the guide's code but perhaps rename the property to `title` in UI. Or just `title` throughout if I can easily update. I'll stick to `name` as per the guide code to minimize friction with provided snippets, but add a comment.
    description?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateObjectRequest {
    name: string; // Corresponds to title
    description?: string;
    image?: any; // Start simple, refine later
}

export interface SocketEvents {
    'object:created': Object;
    'object:deleted': string;
    'object:updated': Object;
}
