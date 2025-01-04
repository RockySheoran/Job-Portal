import DataURIParser from 'datauri/parser.js';

import path from 'path';

const parser = new DataURIParser();

export const getDataUri = (file) => {
    if (!file) {
        throw new Error('No file provided');
    }
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
};