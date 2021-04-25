import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../spinner';
import IngredientDetails from '../ingredient-details';

const BurgerIngredient = ({image, price, name, count=0, addToConstructor, ...details}) => {
  const [showDetails, setShowDetails] = useState(false);  
  
  const openDetails = () => {
    setShowDetails(true);
  }

  const closeDetails = () => {
    setShowDetails(false);
  }
  
  const ingredientDetails = (
    <IngredientDetails
      caption="Детали ингредиента"
      onClose={closeDetails}
      name={name}
      description={`API не возвращает описание ингредиента`}
      {...details}
    />
  );

  return ( 
    <>
      <div
        onClick={function(e) {
          if (e.target.tagName !== 'P' &&
          (e.target.children[0] ? e.target.children[0].tagName !== 'P' : true)) {
            openDetails();
          }
        }}
        className={`mb-4 ${burgerIngredientsStyles.ingredient}`}>
        {count >= 0 && <span className={burgerIngredientsStyles.counter} onClick={addToConstructor}>
          <Counter count={count}/>
        </span>}
        <img
          className="pl-2 pr-2 mb-1"
          src={image} alt={image}/>
        <div
          className={`mb-1 ${burgerIngredientsStyles.cost}`}>
            {price}
            <CurrencyIcon/>
        </div>
        <div className="text text_type_main-default pb-3">
          {name}
        </div>
      </div>
      {showDetails && ingredientDetails}
    </>
    );
}
 
const BurgerIngredients = ({ingredients, addIngredient, isLoading}) => {
  const [currentTab, setCurrentTab] = useState("");
  const [ingredientsOnTab, setIngredientsOnTab] = useState([]);

  useEffect(() => {
    const getIngredientsByType = (tabName) => {
      return [...ingredients.filter(ingredient => ingredient.type === tabName)];
    };
    
    if (currentTab !== "") {
      setIngredientsOnTab([{key: [currentTab], data: getIngredientsByType(currentTab)}]);
    } else {
      setIngredientsOnTab([
          {key: "bun", data: getIngredientsByType("bun")},
          {key: "sauce", data: getIngredientsByType("sauce")},
          {key: "main", data: getIngredientsByType("main")}
      ]);
    }
  }, [currentTab, ingredients]);

  const changeCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  }
  
  const getHeader = (currentTabName) => {
    const names = {
      'bun': 'Булки',
      'sauce': 'Соусы',
      'main': 'Начинки'
    };
    return names[currentTabName];
  }

  const addToConstructor = (ingredient) => {                
    addIngredient(ingredient);
  }

  return ( 
    <section className={burgerIngredientsStyles.container}>
      <div className="mb-1 text text_type_main-large">
        Соберите бургер
      </div>
      <ul className={`mb-3 ${burgerIngredientsStyles.tabs}`}>
        <li><Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={changeCurrentTab}>Булки</Tab></li>
        <li><Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={changeCurrentTab}>Соусы</Tab></li>
        <li><Tab
              value="main"
              active={currentTab === "main"}
              onClick={changeCurrentTab}>Начинки</Tab></li>
      </ul>
      <Spinner isLoading={isLoading} />
      <div className={`pr-1 ${burgerIngredientsStyles.tableWrapper}`}>
          {ingredients.length > 0 && ingredientsOnTab.map(
            (typedSet, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="text text_type_main-medium mb-3">
                    {getHeader(typedSet.key)}
                  </div>        
                  <div className={burgerIngredientsStyles.table}>
                    {
                      typedSet.data.map(ingredient => {
                        const {_id} = ingredient;
                        return (
                          <div        
                            key={_id}>
                            <div>
                              <BurgerIngredient
                                {...ingredient}
                                addToConstructor={() => addToConstructor(ingredient)}
                              />
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>  
                </React.Fragment>
              );
            })
          }
        </div>
    </section>
    );
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  addToConstructor: PropTypes.func.isRequired
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired,
  addIngredient: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
 
export default BurgerIngredients;