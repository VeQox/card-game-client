import type { PageServerLoad } from "./$types";

export const ssr = false;

export const load : PageServerLoad = ({ params }) => {
    return {
        room: params.room
    }
}