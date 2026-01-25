import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
    const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    const pathname = `${folder}/${filename}`;

    const blob = await put(pathname, file, {
        access: 'public',
    });

    return blob.url;
}
