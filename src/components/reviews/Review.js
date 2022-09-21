import React from "react";
import AvatarDefault from "../../assets/images/avatardefault.png";
import {
  Stars0,
  Stars1,
  Stars2,
  Stars3,
  Stars4,
  Stars5,
} from "../../icons/Stars";

function Review({ review, showHost }) {
  // console.log("one review", review);

  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  }

  function showStars(rating) {
    switch (rating) {
      case 0:
        return <Stars0 />;

      case 1:
        return <Stars1 />;

      case 2:
        return <Stars2 />;

      case 3:
        return <Stars3 />;

      case 4:
        return <Stars4 />;

      case 5:
        return <Stars5 />;
    }
  }

  return (
    <div className=" py-4 max-w-[800px] min-w-[700px] border-b border-b-grey-border">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!review.author_avatar ? (
            <img
              className="w-6 h-6 object-cover rounded-full"
              alt="avatar_default"
              src={AvatarDefault}
            />
          ) : (
            <img
              className="w-6 h-6 object-cover rounded-full"
              alt="author_avatar"
              src={review.author_avatar}
            />
          )}
          <p className="font-book-font">
            {" "}
            {review.review_content.author.name
              ? review.review_content.author.name
              : review.review_content.author.email}{" "}
          </p>

          {showHost && (
            <p className="font-light-font text-sm mt-1 mr-3">
              {" "}
              à{" "}
              {review.review_content.host.name
                ? review.review_content.host.name
                : review.review_content.host.email}{" "}
            </p>
          )}
          <p className="font-light-font text-sm mt-1">
            {" "}
            {dataParsed(review.review_content.created_at)}{" "}
          </p>
        </div>
        <div>{showStars(review.review_content.rating)}</div>
      </div>

      <p className="ml-8 mt-2 font-light-font max-w-[500px]">
        {" "}
        {review.review_content.content}{" "}
      </p>
    </div>
  );
}

export default Review;
