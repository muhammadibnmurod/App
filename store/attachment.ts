import { defineStore } from "pinia";

/**
 * Interface for the attachment store state.
 */
interface AttachmentState {
    deletedIds: string[];
}

export const useAttachmentStore = defineStore("attachment", {
    /**
     * The initial state of the store.
     */
    state: (): AttachmentState => ({
        deletedIds: [],
    }),

    getters: {
        /**
         * Checks if a given attachment ID has been marked as deleted.
         * @param state The current state.
         * @returns A function that takes an ID and returns true if it's in the deleted list.
         */
        alive: (state: AttachmentState) => {
            return (id: string): boolean => !state.deletedIds.includes(id);
        },
    },

    actions: {
        /**
         * Adds an attachment ID to the list of deleted IDs if it's not already there.
         * @param id The attachment ID to add.
         */
        delete(id: string) {
            if (!this.deletedIds.includes(id)) {
                this.deletedIds.push(id);
            }
        },
    },
});
