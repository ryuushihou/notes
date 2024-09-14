import React, { Suspense } from 'react'
import Link from 'next/link'
// 导入组件
import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarImport from '@/components/SidebarImport';

export default async function Sidebar() {
    return (
        <>
            <section className="col sidebar">
                <Link href={'/'} className="link--unstyled">
                    <section className="sidebar-header">
                        <strong>My Notes</strong>
                    </section>
                </Link>
                <section className="sidebar-menu" role="menubar">
                    <SidebarSearchField />
                    <EditButton noteId={null}>New</EditButton>
                </section>
                <nav>
                    <Suspense fallback={<NoteListSkeleton />}>
                        <SidebarNoteList />
                    </Suspense>
                </nav>
                <SidebarImport />
            </section>
        </>
    )
}