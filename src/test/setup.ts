import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Make jest-dom types available
declare global {
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
		}
	}
}

afterEach(() => {
	cleanup();
});
