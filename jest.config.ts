import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	moduleFileExtensions: ["ts", "js", "jsx", "mjs"]
};

export default config;