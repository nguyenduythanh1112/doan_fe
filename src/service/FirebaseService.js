import { storageFirebase } from '../config/Firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

function uploadImage(image) {
    return new Promise((resolve, reject) => {
        const imageRef = ref(storageFirebase, `image/${image.name + v4()}`);
        return uploadBytes(imageRef, image).then(() => {
            return getDownloadURL(imageRef).then(url => {
                resolve(url);
            })
        })
    })
}

function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const fileRef = ref(storageFirebase, `file/${file.name + v4()}`);
        return uploadBytes(fileRef, file).then(() => {
            return getDownloadURL(fileRef).then(url => {
                resolve(url);
            })
        })
    })
}

export { uploadImage, uploadFile }