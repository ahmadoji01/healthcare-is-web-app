'use client';

import BoardSectionList from "./common/kanban/components/BoardSectionList";
import { DataModalProvider } from "@/contexts/data-modal-context";

const QueueManager = () => {

    return (
        <DataModalProvider>
            <BoardSectionList />
        </DataModalProvider>
    );
}

export default QueueManager;