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
import MyHostedMeals from "../../user/MyHostedMeals";
import Loader from "../../Loader";
import { useAtomValue, useSetAtom } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import OrderConfirmation from "../order/OrderConfirmation";
import { OrderConfirmationAtom } from "../../../atoms/OrderConfirmation";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import SectionTitle from "../../titles/SectionTitle";
import JSConfetti from "js-confetti";

function MealDetails() {
  const [meal, setMeal] = useState();
  const [hostedMeals, setHostedMeals] = useState();
  const [hostAvatar, setHostavatar] = useState();
  const currentUserAtom = useAtomValue(currentuserAtom);
  const mealId = useParams().mealId;
  const navigate = useNavigate();
  const jsConfetti = new JSConfetti();
  const orderConfirmationAtom = useAtomValue(OrderConfirmationAtom);
  const setOrderConfirmationAtom = useSetAtom(OrderConfirmationAtom);

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

  if (window.location.href !== `http://localhost:3001/meals/${mealId}`) {
    console.log("FIRST", window.location.href);
    setOrderConfirmationAtom(true);
    jsConfetti.addConfetti();
  }

  const closeModal = () => {
    console.log("SECOND", window.location.href);
    // setOrderConfirmationAtom(false);
    // return (window.location.href = `http://localhost:3001/meals/${mealId}`);
    return window.history.go(-1);
  };

  const redirectToPath = (path) => {
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
            <MealDetailsFooter meal={meal} />
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
