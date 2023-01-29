import apiUrl from '../api';
import { FileContentType, ImportStatus } from '../Types/App';

export function importData(file: File, endpoint: FileContentType): Promise<ImportStatus> {
    const body = new FormData();
    body.append("file", file);

    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/import/${endpoint}`, {
            method: 'POST',
            body: body,
            headers: {
                'access-control-allow-origin': '*',
                'content-length': `${file.size}`,
            },
        })
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => {
            resolve(data);
        })
        .catch((e) => reject(e));
    })
}
