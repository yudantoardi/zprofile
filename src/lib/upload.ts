import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    const relativePath = `/${folder}/${filename}`;
    const absolutePath = join(process.cwd(), 'public', folder, filename);

    // Ensure directory exists
    await mkdir(join(process.cwd(), 'public', folder), { recursive: true });

    await writeFile(absolutePath, buffer);
    return relativePath;
}
