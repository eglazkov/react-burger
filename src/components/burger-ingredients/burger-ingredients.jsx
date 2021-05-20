import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../spinner';
import BurgerIngredient from '../burger-ingredient';

import {useIngredeints} from '../../services';
 
const BurgerIngredients = ({addIngredient}) => {
  const [currentTab, setCurrentTab] = useState("");
  const [ingredientsOnTab, setIngredientsOnTab] = useState([]);
  const [{ingredients, isIngredientsLoading}] = useIngredeints();  

  useEffect(() => {
    const getIngredientsByType = (tabName) => {
      return [...ingredients.filter(ingredient => ingredient.type === tabName)];
    };
    
    setIngredientsOnTab([
      {key: "bun", data: getIngredientsByType("bun")},
      {key: "sauce", data: getIngredientsByType("sauce")},
      {key: "main", data: getIngredientsByType("main")}
    ]);
    
  }, [ingredients]);
  
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
              onClick={() => {
                document.location='#bun';
                return false;
              }}
              >Булки</Tab></li>              
        <li><Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={() => {
                document.location='#sauce';
                return false;
              }}>Соусы</Tab></li>
        <li><Tab
              value="main"
              active={currentTab === "main"}
              onClick={() => {
                document.location='#main';
                return false;
              }}>Начинки</Tab></li>
      </ul>
      <Spinner isLoading={isIngredientsLoading} />
      <div className={`pr-1 ${burgerIngredientsStyles.tableWrapper}`}
        onScroll={({target}) => {
          const targetTop = target.getBoundingClientRect().y;
          if (
            document.getElementById('bun') ||
            document.getElementById('sauce') ||
            document.getElementById('main')
            ) {            
            const bunElTop = document.getElementById('bun').getBoundingClientRect().y-targetTop;
            const sauceTop = document.getElementById('sauce').getBoundingClientRect().y-targetTop;
            const mainElTop = document.getElementById('main').getBoundingClientRect().y-targetTop;
            const activeTab = mainElTop <= 24 ? 'main':
            sauceTop <= 24 ? 'sauce' : bunElTop <=24 ? 'bun' : '';          
            setCurrentTab(activeTab);
          }
        }}>
          {ingredients.length > 0 && ingredientsOnTab.map(
            (typedSet, i) => {
              return (
                <React.Fragment key={i}>
                  <div id={typedSet.key} className="text text_type_main-medium mb-3">
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

BurgerIngredients.propTypes = {
  addIngredient: PropTypes.func.isRequired
};
 
export default BurgerIngredients;