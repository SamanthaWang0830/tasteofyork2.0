import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setPreviewUrl} from "../../store/fileSlice";
import { RootState } from "../../store/store";
import './ImageUpload.styles.scss'

interface ImageUploadProps{
    profilePicture: boolean;
    file?: any;
    setFile?: any;
}

const ImageUpload:React.FC<ImageUploadProps>=({profilePicture, file, setFile})=>{
    // const file= useSelector((state: RootState)=>state.file.file)
    const previewUrl = useSelector((state: RootState) => state.file.previewUrl);
    const dispatch = useDispatch();


    const filePickerRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!file) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
          dispatch(setPreviewUrl(fileReader.result));
        };
        fileReader.readAsDataURL(file);
    }, [file]);


    const pickImageHandler = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }
    }

    const pickedHandler =(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length === 1) {
            const selectedFile = e.target.files[0];
            console.log(selectedFile)
            setFile(selectedFile);
        }
    }


    return (
        <div className='image-upload-container'>
            <input
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className='image-upload'>
                <div className="image-upload__preview">
                {previewUrl && typeof previewUrl === 'string' && <img src={previewUrl} alt="Preview" />}
                {!previewUrl && <p>Please pick an {profilePicture&& "profile"} image.</p>}
                </div>
                <button onClick={pickImageHandler} className="pick-image-button">Pick Image</button>
            </div>
        </div>
    )
}

export default ImageUpload