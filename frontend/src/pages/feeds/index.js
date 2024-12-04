import React, { useRef, useState, useEffect } from 'react';
import Editor from '../../component/editor';
import Quill from 'quill';
import FeedsList from './listings';
import { useAuth } from '../../context/authContext';
import AuthAddUserInfo from '../auth/AuthAddUserInfos';
import AuthAddUserPicture from '../auth/AuthAddUserPicture';
import Header from '../../component/header';
import Footer from '../../component/footer';
import client from '../../context/axiosConfig';
import FeedsType from '../../component/FeedTypes';
import People from '../../component/people';

const Delta = Quill.import('delta');

function Feed() {
  const { currentUser } = useAuth();
  const [setRange] = useState();
  const [setLastChange] = useState();
  const [readOnly] = useState(false);
  const quillRef = useRef();

  const [isUserInfoComplete, setIsUserInfoComplete] = useState(false);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [progress, setProgress] = useState(25);
  const [progressColor, setProgressColor] = useState("red");
  const [progressDisplay, setProgressDisplay] = useState("");

  useEffect(() => {
    if (currentUser?.user?.first_name && currentUser?.user?.last_name) {
      setIsUserInfoComplete(true);
      setProgress(60);
      setProgressColor("orange");
      setProgressDisplay("");
    }

    if (currentUser?.user?.userpicture) {
      setIsPictureUploaded(true);
      setProgress(100);
      setProgressColor("#06d406");
      setProgressDisplay("d-none");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quillHtml = quillRef.current.container.innerText;

    const feedData = {
      content: quillHtml,
    };

    try {
      const response = await client.post('/api/addNewFeed', feedData);
      if (response) {
        console.log('Feed created successfully.');
      }
    } catch (error) {
      console.error('Error adding new feed:', error);
    }
  };

  const handleUserInfoComplete = () => {
    setIsUserInfoComplete(true);
    setProgress(60);
    setProgressColor("orange");
    setProgressDisplay("");
  };

  const handlePictureUploaded = () => {
    setIsPictureUploaded(true);
    setProgress(100);
    setProgressColor("#06d406");
    setProgressDisplay("d-none");
  };

  return (
    <>
      <Header />
      <main>
        <div className="content d-flex flex-column flex-column-fluid bg-light" id="kt_content">
          <div className="d-flex flex-column-fluid">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                  <div className={`progress rounded-0 ${progressDisplay}`} style={{ height: '5px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%`, backgroundColor:`${progressColor}` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  {!isUserInfoComplete ? (
                    <AuthAddUserInfo onComplete={handleUserInfoComplete} />
                  ) : !isPictureUploaded ? (
                    <AuthAddUserPicture onUploadComplete={handlePictureUploaded} />
                  ) : (
                    <div className="card card-custom gutter-b">

                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <FeedsType />
                          <Editor
                            ref={quillRef}
                            readOnly={readOnly}
                            defaultValue={new Delta()}
                            onSelectionChange={setRange}
                            onTextChange={setLastChange}
                          />
                          <button className="btn font-weight-bolder btn-sm btn-success mt-2 float-right" type="submit">
                            Create new
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                  <FeedsList />
                </div>
                <div className="col-xl-4">
                  <div className="card card-custom bg-light-warning gutter-b card-shadowless" style={{ maxHeight: '400px' }}>
                    <div className="card-header bg-light-default border-0">
                      <h3 className="card-title font-weight-bolder text-success">People</h3>
                    </div>
                    <div className="card-body pt-2">
                      <div className="scrollable-container overflow-auto" style={{ maxHeight: '100%' }}>
                        <People />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Feed;