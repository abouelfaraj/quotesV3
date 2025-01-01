import React, { useEffect, useState } from 'react';
import config from '../../config';
import Dropzone from 'dropzone';
import client from '../../context/axiosConfig';
import { useAuth } from '../../context/authContext';

function AuthAddUserPicture({ onUploadComplete }) {
    const { currentUser, setCurrentUser } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        Dropzone.autoDiscover = false;
        const dropzoneElement = document.querySelector('#kt_dropzone');
        const DropzoneAction = new Dropzone(dropzoneElement, {
            url: `${config.baseURL}/api/upload_file`,
            maxFiles: 1,
            maxFilesize: 3,
            autoProcessQueue: false,
            acceptedFiles: 'image/*',
            addRemoveLinks: true,
            dictDefaultMessage: 'Drag & drop your Profile image',
        });

        DropzoneAction.on('addedfile', function (file) {
            if (DropzoneAction.files.length > 1) {
                DropzoneAction.removeFile(file);
                setErrorMessage('You can only upload one file at a time.');
            } else {
                setUploadedFile(file);
                setErrorMessage('');
            }
        });

        DropzoneAction.on('error', function (file, errorMessage) {
            setIsLoading(false);
            setErrorMessage('Error uploading file: ' + errorMessage);
        });

        return () => {
            DropzoneAction.destroy();
        };
    }, []);

    const uploadFile = async () => {
        if (!uploadedFile) {
            setErrorMessage('No file selected for upload.');
            return;
        }

        setIsLoading(true);

        try {

            const formData = new FormData();
            formData.append('picture', uploadedFile);

            const response = await client.post('api/add_user_picture', formData);

            if (response.status === 201 || response.status === 200) {
                const result = response.data;
                if (result.file_content) {
                    const base64Image = `data:image/jpeg;base64,${result.file_content}`;
                    setImageUrl(base64Image);
                    const updatedUser = {
                        ...currentUser,
                        user: {
                            ...currentUser.user,
                            userProfile: {
                                ...currentUser.user.userProfile,
                                picture: base64Image,
                            },
                        },
                    };
                    setCurrentUser(updatedUser);
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    onUploadComplete();
                }
            } else {
                setErrorMessage(response.data.error || 'Upload failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred while uploading the picture.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card card-custom gutter-b bg-light">
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder">
                    Great!, just 2 steps to complete your registration
                </h3>
            </div>
            <div className="card-body pt-0 margin-auto">
                <div className="col-lg-4 col-md-9 col-sm-12 mx-auto">
                    <div className="dropzone dropzone-default" id="kt_dropzone">
                        <div className="dropzone-msg dz-message needsclick">
                            <span className="dropzone-msg-desc">
                                Drag/Select your profile image
                                <strong>not</strong> actually uploaded.
                            </span>
                            {isLoading && <p>Uploading...</p>}
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {imageUrl && (
                                <div id="uploaded-image" style={{ marginTop: '20px' }}>
                                    <img 
                                        id="uploaded-image-id" 
                                        src={imageUrl} 
                                        alt="Uploaded" 
                                        style={{ maxWidth: '100%' }} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-success mt-3 float-right"
                    onClick={() => uploadFile()}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AuthAddUserPicture;