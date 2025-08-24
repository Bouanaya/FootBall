// pages/api/upload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formidable from "formidable";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    const file = files.file;
    const storage = getStorage();
    const storageRef = ref(storage, `players/${file.originalFilename}`);

    const buffer = Buffer.from(await fs.promises.readFile(file.filepath));
    await uploadBytes(storageRef, buffer);

    const url = await getDownloadURL(storageRef);
    res.status(200).json({ url });
  });
}
