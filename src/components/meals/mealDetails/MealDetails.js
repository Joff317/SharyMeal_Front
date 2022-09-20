import React, { useEffect, useState } from "react";
import { API } from "../../../utils/variables";
import { useNavigate, useParams } from "react-router-dom";
import "./MealDetails.scss";
import MealDetailsImages from "./MealDetailsImages";
import MealDetailsTitle from "./MealDetailsTitle";
import MealDetailsHost from "./MealDetailsHost";
import MealDetailsDescription from "./MealDetailsDescription";
import MealDetailsInformations from "./MealDetailsInformations";
import MealDetailsFooter from "./MealDetailsFooter";
import MealHostProfile from "./MealHostProfile";
import Loader from "../../Loader";
import { useAtomValue, useSetAtom } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import { OrderConfirmationAtom } from "../../../atoms/OrderConfirmation";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import SectionTitle from "../../titles/SectionTitle";
import JSConfetti from "js-confetti";
import Cookies from "js-cookie";
import { CURRENT_URL } from "../../../utils/variables";

function MealDetails() {
  const [meal, setMeal] = useState();
  const [hostedMeals, setHostedMeals] = useState();
  const [hostAvatar, setHostavatar] = useState();
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const currentUserAtom = useAtomValue(currentuserAtom);
  const mealId = useParams().mealId;
  const navigate = useNavigate();
  const jsConfetti = new JSConfetti();
  const orderConfirmationAtom = useAtomValue(OrderConfirmationAtom);
  const setOrderConfirmationAtom = useSetAtom(OrderConfirmationAtom);
  const token = Cookies.get("token");

  console.log('CURRENT_URL', CURRENT_URL);
  console.log("MEALID", mealId);

  const createAttendance = () => {
    fetch(API + "attendances", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        attendance: {
          meal_id: mealId,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("CREATE ATTENDANCE", response);
        updateGuestRegisteredCount();
      })
      .catch((error) => console.error(error));
  };

  const updateGuestRegisteredCount = () => {
    fetch(API + `meals/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        meal: {
          guest_registered: meal.guest_registered + bookingQuantity,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => console.log("UPDATE MEAL GUESTRESGISTRED", response));
  };

  useEffect(() => {
    fetch(API + `meals/${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meal);
        setHostedMeals(data.hosted_meals);
        setHostavatar(data.host_avatar);
        document.documentElement.scrollTop = 0;
      });
  }, []);

  if (window.location.href !== CURRENT_URL + `meals/${mealId}`) {
    setOrderConfirmationAtom(true);
    jsConfetti.addConfetti();
  }

  const closeModal = () => {
    createAttendance();
    // setOrderConfirmationAtom(false);
    // return (window.location.href = `http://localhost:3001/meals/${mealId}`);
    console.log('window.history', window.history);
    return window.history.go(-1);
  };

  const redirectToPath = (path) => {
    createAttendance();
    setOrderConfirmationAtom(false);
    return navigate(path);
  };

  return (
    <>
      {meal ? (
        <div className="meal-detail-container">
          <div className="top-detail-container">
            <MealDetailsImages meal={meal} />

            <div className="meal-detail-right-container">
              <div className="meal-detail-right-top-container">
                <MealDetailsTitle meal={meal} />
                <MealDetailsHost meal={meal} />
              </div>

              {orderConfirmationAtom && (
                <LayoutBlur>
                  <div className="flex flex-col items-center">
                    <SectionTitle> C’est réservé 🎉 </SectionTitle>
                    <p className="text-center font-book-font mt-6 mb-8">
                      Bravo, votre paiement s’est bien passé. Vous pouvez
                      désormais retrouver votre repas dans votre compte client,
                      dans l’onglet “mes repas”
                    </p>
                    <span onClick={() => redirectToPath("/")}>
                      <Button showText={true}> Continuer ma navigation </Button>
                    </span>
                    <p
                      className="underline hover:cursor-pointer mt-3 text-sm font-book-font"
                      onClick={() => redirectToPath("/user")}
                    >
                      Voir mes repas
                    </p>
                    <span
                      className="absolute top-5 right-5"
                      onClick={closeModal}
                    >
                      <Button showIcon={true} icon={<Close />}></Button>
                    </span>
                  </div>
                </LayoutBlur>
              )}

              <MealDetailsDescription meal={meal} />

              <MealDetailsInformations meal={meal} />
            </div>
          </div>

          <MealHostProfile
            meal={meal}
            hostedMeals={hostedMeals}
            hostAvatar={hostAvatar}
          />
          {currentUserAtom.id !== meal.host.id && (
            <MealDetailsFooter
              meal={meal}
              setBookingQuantity={setBookingQuantity}
              bookingQuantity={bookingQuantity}
            />
          )}
        </div>
      ) : (
        <>
          <Loader type="spinningBubbles" color="#292929" />
        </>
      )}
    </>
  );
}

export default MealDetails;
