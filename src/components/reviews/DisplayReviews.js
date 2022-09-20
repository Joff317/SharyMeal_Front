import React from 'react';

function DisplayReviews({reviewStatus, reviews}) {
    return (
        <div>
            Reviews {reviewStatus}

            {
                
                reviewStatus === "received" ?
                    reviews.received.map(review => (
                      <div className="review">
                          <span>{review.content}</span>
                          <span>{review.rating}</span>
                      </div>
                    ))
                    :
                    reviews.written.map(review => (
                        <div className="review">
                          <span>{review.content}</span>
                          <span>{review.rating}</span>
                      </div>
                    ))

            }
        </div>
    );
}

export default DisplayReviews;