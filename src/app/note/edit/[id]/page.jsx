import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/prisma';
import { sleep } from '@/lib/utils';
// import { auth } from "auth"

export default async function EditPage({ params }) {
    // 没有middleware的时候在这里添加auth
    // const session = await auth()
    // if (!session?.user) {
    //     return <div>请先登录</div>
    // }
    const noteId = params.id;
    const note = await getNote(noteId)

    // 让效果更明显
    await sleep(1000);

    if (note === null) {
        return (
            <div className="note--empty-state">
                <span className="note-text--empty-state">
                    Click a note on the left to view something! 🥺
                </span>
            </div>
        )
    }

    return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}