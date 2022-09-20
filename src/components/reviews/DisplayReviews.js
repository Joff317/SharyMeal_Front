import React from 'react';

function DisplayReviews({reviewStatus, reviews}) {
    return (
        <div>
            Reviews {reviewStatus}

            {
                
                reviewStatus === "received" ?
                    reviews.received.map(review => (
                        <p>{review.content}</p>
                    ))
                    :
                    reviews.written.map(review => (
                        <p>{review.content}</p>
                    ))

            }
        </div>
    );
}

export default DisplayReviews;