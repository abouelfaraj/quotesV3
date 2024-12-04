import React, { useState, useEffect } from 'react';
import client from '../context/axiosConfig';
import {SkeletonLoaderTypeFeed} from '../component/SkeletonLoader';
import { Overlay, Popover } from 'react-bootstrap';

const FeedsType = () => {
    const [typeFeeds, setTypeFeeds] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const [popoverTarget, setPopoverTarget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePopover = (event) => {
        if (event.currentTarget.getAttribute('value') !== '1') {
            setShowPopover(true);
            setPopoverTarget(event.currentTarget);
        }
    };

    const handleClosePopover = () => {
        setShowPopover(false);
        setPopoverTarget(null);
    };

    useEffect(() => {
        const fetchTypeFeeds = async () => {
            try {
                const response = await client.get('api/typefeeds');
                setTypeFeeds(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTypeFeeds();
    }, []);

    if (loading) return <SkeletonLoaderTypeFeed />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {typeFeeds.map((typeFeed, index) => (
                <div key={typeFeed.id} className={`btn btn-icon btn-md btn-clean mr-2 mb-2 ${index === 0 ? 'active' : ''}`} value={typeFeed.id} onClick={handlePopover}>
                    <span className="svg-icon svg-icon-md p-1">
                        <div dangerouslySetInnerHTML={{ __html: typeFeed.svg_path }} />
                    </span>
                </div>
            ))}
            <Overlay
                show={showPopover}
                target={popoverTarget}
                placement="top"
                container={this}
                containerPadding={20}
            >
                <Popover id="popover-contained" title="Info" onClick={handleClosePopover}>
                    <div className='p-2'><strong>Not available yet</strong></div>
                </Popover>
            </Overlay>
        </>
    );
};

export default FeedsType;