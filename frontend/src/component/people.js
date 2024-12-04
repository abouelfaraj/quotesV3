import React, { useEffect, useState } from 'react';
import { SkeletonLoaderPeople } from '../component/SkeletonLoader';
import client from '../context/axiosConfig';

const People = () => {
    const [Peoples, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(new Set());

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await client.get('api/UserList');
                setPeople(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

    const followUser = async (userId) => {
        try {
            const response = await client.post('api/FollowNewUser', { followed_id: userId });
            console.log(response.data.message);
            setFollowedUsers(prev => new Set(prev).add(userId));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <SkeletonLoaderPeople />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>

            {Peoples.filter(person => !followedUsers.has(person.id)).length ? (
                Peoples.filter(person => !followedUsers.has(person.id)).map(person => (
                    <div className="d-flex align-items-center mb-5">
                        <div className="symbol symbol-40 symbol-light-white mr-5">
                            <div className="symbol-label">
                                <img src="/metronic/theme/html/demo5/dist/assets/media/svg/avatars/002-girl.svg" className="h-75 align-self-end" alt="" />
                            </div>
                        </div>
                        <div className="d-flex flex-column font-weight-bold flex-grow-1">
                            <a href="/" className="text-dark text-hover-primary mb-1 font-size-lg">{person.first_name}</a>
                            <span className="text-muted">Creative Director</span>
                        </div>
                        <div className="ml-auto mr-5">
                            <button onClick={() => followUser(person.id)} className="btn btn-icon btn-md btn-clean" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="svg-icon svg-icon-lg">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <title>Stockholm-icons / Navigation / Plus</title>
                                        <desc>Created with Sketch.</desc>
                                        <defs />
                                        <g stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                            <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1" />
                                            <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1" />
                                        </g>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mb-lg-0">
                    <a className="nav-link py-10 d-flex flex-grow-1 rounded flex-column align-items-center" data-toggle="pill" href="#tab_forms_widget_2">
                        <span className="nav-icon py-2">
                            <span className="svg-icon svg-icon-2x">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <title>Stockholm-icons / General / User</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs />
                                    <g stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24" />
                                        <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                        <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                                    </g>
                                </svg></span>                    </span>
                        <span className="nav-text font-size-lg py-2 font-weight-bolder text-center">
                            Get new Followers
                        </span>
                    </a>
                </div>
            )}

        </>
    )
}
export default People;