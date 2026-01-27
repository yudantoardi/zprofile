import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Undo, Redo, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = async () => {
        // Create a hidden file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                setIsUploadingImage(true);
                try {
                    // Upload to Vercel Blob
                    const blob = await upload(file.name, file, {
                        access: 'public',
                        handleUploadUrl: '/api/upload',
                    });

                    // Insert image with URL
                    editor.chain().focus().setImage({ src: blob.url }).run();
                } catch (error) {
                    console.error('Image upload failed:', error);
                    alert('Failed to upload image. Please try again.');
                } finally {
                    setIsUploadingImage(false);
                }
            }
        };

        input.click();
    };

    return (
        <div className="border border-border rounded-xl overflow-hidden bg-white">
            <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-slate-50">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-300' : ''}`}
                    title="Bold"
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-300' : ''}`}
                    title="Italic"
                >
                    <Italic size={16} />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-300' : ''}`}
                    title="Heading 1"
                >
                    <Heading1 size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-300' : ''}`}
                    title="Heading 2"
                >
                    <Heading2 size={16} />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-300' : ''}`}
                    title="Bullet List"
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-300' : ''}`}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-slate-300' : ''}`}
                    title="Add Link"
                >
                    <LinkIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    disabled={isUploadingImage}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isUploadingImage ? 'bg-primary/10' : ''}`}
                    title={isUploadingImage ? "Uploading image..." : "Add Image"}
                >
                    {isUploadingImage ? <Loader2 size={16} className="animate-spin text-primary" /> : <ImageIcon size={16} />}
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded hover:bg-slate-200 transition-colors disabled:opacity-30"
                    title="Undo"
                >
                    <Undo size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded hover:bg-slate-200 transition-colors disabled:opacity-30"
                    title="Redo"
                >
                    <Redo size={16} />
                </button>
            </div>
            <EditorContent editor={editor} />
            {placeholder && !content && (
                <div className="absolute top-14 left-4 text-muted pointer-events-none italic">
                    {placeholder}
                </div>
            )}
        </div>
    );
}
