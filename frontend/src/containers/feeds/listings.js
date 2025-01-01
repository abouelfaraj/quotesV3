import React, { useEffect, useState } from 'react';
import { SkeletonLoaderFeeds } from '../../components/SkeletonLoader';
import girl_19 from '../../assets/media/svg/avatars/018-girl-9.svg'
import client from '../../context/axiosConfig';

const FeedsList = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await client.get('api/feeds');
                setFeeds(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

    if (loading) return <SkeletonLoaderFeeds />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {feeds.length ? (
                feeds.map(feed => (
                    <div className="card card-custom gutter-b" key={feed.id}>
                        <div className="card-body">
                            <div>
                                <div className="d-flex align-items-center pb-4">
                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                        <span className="symbol-label">
                                            <img src={girl_19} className="h-75 align-self-end" alt="User Avatar" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column flex-grow-1">
                                        <a href="/" className="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">  {feed.user}</a>
                                        <span className="text-muted font-weight-bold">{new Date(feed.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-dark-75 font-size-lg font-weight-normal">
                                        {feed.content}
                                    </p>
                                    <div className="separator separator-solid mt-5 mb-4"></div>
                                    <div className="d-flex align-items-center">
                                        <a href="/" className="btn btn-hover-text-danger btn-hover-icon-danger btn-sm btn-text-dark-50 bg-hover-light-danger rounded font-weight-bolder font-size-sm p-2">
                                            <span className="svg-icon svg-icon-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <title>Heart</title>
                                                    <path d="M16.5,4.5 C14.891,4.5 13.008,6.325 12,7.5 C10.992,6.325 9.109,4.5 7.5,4.5 C4.651,4.5 3,6.722 3,9.55 C3,12.683 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.922 19.349,4.5 16.5,4.5 Z" fill="#000" fillRule="nonzero"></path>
                                                </svg>
                                            </span> {feed.likes_count}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="card card-custom gutter-b">
                    <div className="card-body text-center">
                        <i className='flaticon-map icon-6x'></i>
                        <p className="text-muted">You have no feeds yet.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedsList;
