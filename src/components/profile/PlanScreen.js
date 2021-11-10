import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import css from "./PlanScreen.module.css";
import { loadStripe } from "@stripe/stripe-js";
import LoadingSpinner from "../UI/LoadingSpinner";

import db from "../../firebase";

const PlanScreen = () => {
  const [products, setProducts] = useState({});
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnapshot = await productDoc.ref.collection("prices").get();
          priceSnapshot.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckOut = async (priceId) => {
    setLoading(true);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // show en error and inspect your Cloud Function logs in Firebase console
        alert("Something whent wrong" + error.message);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51Jrg1kHofrvPbdqeg4b3dm6kXfvJJPgbjdPLbzrpwCdkZG5xdvhttQSTqPC1NUcVPNPfq84gh7E3aJRLDqo7XxeS00qoFwwUhg"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
    setLoading(true);
  };

  if (!loading) {
    return (
      <div className={css.planScreen}>
        {subscription && (
          <p className={css.planScreen__endSubscription}>
            Renewal data :{" "}
            {new Date(subscription?.current_period_end * 1000).toLocaleString()}
          </p>
        )}
        {Object.entries(products).map(([productId, productData]) => {
          // check if users subscription is active
          const isCurrentPackage = productData.name === subscription?.role;

          return (
            <section key={productId} className={css.planScreen__subscription}>
              <article className={css.planScreen__info}>
                <h4>{productData.name} </h4>
                <h5>{productData.description}</h5>
              </article>
              <button
                onClick={() =>
                  !isCurrentPackage && loadCheckOut(productData.prices.priceId)
                }
                className={
                  isCurrentPackage
                    ? `${css.planScreen__button} ${css.planScreen__buttonCurrent}`
                    : css.planScreen__button
                }
              >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
              </button>
            </section>
          );
        })}
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }
};

export default PlanScreen;
