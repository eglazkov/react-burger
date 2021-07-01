import React, {FC, useRef, useCallback, useEffect} from "react";
import {useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {useOrder, useConstructor, useIngredeints, useAuth, history, TIngredient} from "../../services";
import {TRemoveIngredient, TAddIngredient} from "../../pages/main/main";

interface IBurgerConstructor {
  removeIngredient: TRemoveIngredient,
  addIngredient: TAddIngredient
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ removeIngredient, addIngredient }) => {
  const dispatch = useDispatch();
  const myRef = useRef(null);

  const [
    { totalCost, orderId, isShowOrderDetails, errorMessage },
    { fetchDataOrderAction, closeOrderDetailsAction, resetTotalCostAction },
  ] = useOrder();
  const [
    { constructorIngredients, showDropLocation },
    { resetConstructorAction },
  ] = useConstructor();
  const [, { fetchIngredientsAction }] = useIngredeints();
  const [
    {user}
  ] = useAuth();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient-constructor",
    drop(item: {ingredient: TIngredient}) {
      addIngredient(item.ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const bun = constructorIngredients.find(item => item.type === 'bun');

  const closeOrderDetails = useCallback(() => {
    dispatch(resetConstructorAction());
    dispatch(resetTotalCostAction());
    dispatch(closeOrderDetailsAction());
    dispatch(fetchIngredientsAction());
  }, [
    closeOrderDetailsAction,
    resetConstructorAction,
    fetchIngredientsAction,
    resetTotalCostAction,
    dispatch,
  ]);

  const sendOrder = () => {
    if (!user) {
      history.push({pathname: '/login'});
      return;
    }
    dispatch(
      fetchDataOrderAction(constructorIngredients.map((item) => item._id))
    );
  };

  useEffect(() => {
    errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
  }, [errorMessage]);

  return (
    <>
      <section
        data-testid="constructor-drop-location"
        data-ishover={String(isHover || showDropLocation)}
        className={`pl-4 text text_type_main-medium text_color_inactive ${burgerConstructorStyles.container}`}
        ref={dropTarget}
      >
        <div className={`mb-3 pr-1`}>
          {bun && (
            <BurgerConstructorElement
              className="mb-2"
              isFirst
              id={bun._id}
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun["image_mobile"]}
            />
          )}
          <div
            className={`${burgerConstructorStyles.tableWrapper}`}
            ref={myRef}
          >
            {constructorIngredients
              .filter((item) => item.type !== 'bun')
              .map((addedIngredient, index, arr) => {
                return (
                  <BurgerConstructorElement
                    draggable
                    index={index}
                    id={addedIngredient._id}
                    key={`${addedIngredient.constructorId}`}
                    className={arr.length - 1 !== index ? "mb-2" : ''}
                    handleClose={() => removeIngredient(index + 1)}
                    price={addedIngredient.price}
                    text={`${addedIngredient.name}`}
                    thumbnail={addedIngredient["image_mobile"]}
                  />
                );
              })}
          </div>
          {bun && (
            <BurgerConstructorElement
              className="mt-2"
              id={bun._id}
              isLast
              price={bun.price}
              text={`${bun.name} (низ)`}
              thumbnail={bun["image_mobile"]}
            />
          )}
        </div>
        {constructorIngredients.length > 0 && (
          <div>
            <div className={`mt-1 ${burgerConstructorStyles.footer}`}>
              {totalCost}
              <CurrencyIcon type="primary" />
              <div onClick={sendOrder}>
                <Button>Оформить заказ</Button>
              </div>
            </div>
          </div>
        )}
      </section>
      {isShowOrderDetails && (
        <OrderDetails onClose={closeOrderDetails} orderId={orderId} />
      )}
    </>
  );
};

export default BurgerConstructor;
