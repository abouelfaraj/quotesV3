import React from 'react';

const SkeletonLoaderFeeds = () => (
    <div className="skeleton-loader">
        <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-title"></div>
        </div>
        <div className="skeleton-content"></div>
        <div className="skeleton-footer">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
        </div>
    </div>
);

const SkeletonLoaderTypeFeed = () => (
    <div className="skeleton-loader">
        <div className="skeleton-item" />
        <div className="skeleton-item" />
        <div className="skeleton-item" />
    </div>
);

const SkeletonLoaderPeople = () => (
    <div class="d-flex align-items-center mb-5 skeleton-loader">
        <div class="symbol symbol-40 symbol-light-warning mr-5">
            <div class="symbol-label">
                <div class="skeleton-circle"></div>
            </div>
        </div>

        <div class="d-flex flex-column font-weight-bold">
            <div class="skeleton-line mb-1"></div>
            <div class="skeleton-line short"></div>
        </div>
    </div>
);

export { SkeletonLoaderFeeds, SkeletonLoaderTypeFeed, SkeletonLoaderPeople };