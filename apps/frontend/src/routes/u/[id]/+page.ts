import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = ({ params }) => {
	if (typeof params.id === 'string') {
		return {
			userId: params.id
		};
	}

	throw error(404, 'Not found');
};
