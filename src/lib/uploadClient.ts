type UploadProgressCb = (percent: number) => void;

export async function uploadFileToCloudinary(file: File, options?: { onProgress?: UploadProgressCb; folder?: string }) {
  const onProgress = options?.onProgress;
  const folder = options?.folder || 'mantra_images';

  // Helper fallback: post to server-side uploader (accepts dataUrl)
  const fallbackUpload = async () => {
    const dataUrl = await readFileAsDataURL(file);
    const resp = await fetch('/api/uploads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl }) });
    if (!resp.ok) throw new Error(await resp.text());
    return resp.json();
  };

  try {
    const sigRes = await fetch('/api/uploads/sign');
    if (!sigRes.ok) {
      // fallback
      return await fallbackUpload();
    }
    const sig = await sigRes.json();
    const cloudName = sig.cloudName || sig.cloud_name;
    const apiKey = sig.apiKey || sig.api_key;
    const signature = sig.signature;
    const timestamp = sig.timestamp;

    if (!cloudName) return await fallbackUpload();

    return await new Promise<any>((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const xhr = new XMLHttpRequest();
      const form = new FormData();
      form.append('file', file);
      if (apiKey) form.append('api_key', apiKey);
      if (timestamp) form.append('timestamp', String(timestamp));
      if (signature) form.append('signature', signature);
      form.append('folder', folder);

      xhr.open('POST', url);
      xhr.responseType = 'json';

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable && onProgress) {
          const pct = Math.round((ev.loaded / ev.total) * 100);
          try { onProgress(pct); } catch (e) { /* ignore */ }
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          // try fallback
          fallbackUpload().then(resolve).catch(err => reject(err));
        }
      };

      xhr.onerror = () => {
        // fallback
        fallbackUpload().then(resolve).catch(err => reject(err));
      };

      xhr.send(form);
    });
  } catch (err) {
    // final fallback to server
    return await fallbackUpload();
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}
