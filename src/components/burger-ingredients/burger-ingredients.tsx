import React, {FC, useState, useEffect} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../spinner/spinner';
import BurgerIngredient, { TBurgerIngredient } from '../burger-ingredient/burger-ingredient';
import Link from '../link/link';

import {useIngredeints} from '../../services';
import {TAddIngredient} from '../../pages/main/main';

interface IBurgerIngredients {
  addIngredient: TAddIngredient
};

type TIngredientTypes = "bun" | "sauce" | "main";

type TIngredientTab = {
  key: TIngredientTypes,
  data: TBurgerIngredient[]
};
 
const BurgerIngredients: FC<IBurgerIngredients> = ({addIngredient}) => {
  const [currentTab, setCurrentTab] = useState("");
  const [ingredientsOnTab, setIngredientsOnTab] = useState<Array<TIngredientTab>>([]);
  const [{ingredients, isIngredientsLoading}] = useIngredeints();  

  useEffect(() => {
    const getIngredientsByType = (tabName: string) => {
      return [...ingredients.filter(ingredient => ingredient.type === tabName)];
    };
    
    setIngredientsOnTab([
      {key: "bun", data: getIngredientsByType("bun")},
      {key: "sauce", data: getIngredientsByType("sauce")},
      {key: "main", data: getIngredientsByType("main")}
    ]);
    
  }, [ingredients]);
  
  const getHeader = (currentTabName: TIngredientTypes) => {
    const names = {
      'bun': 'Булки',
      'sauce': 'Соусы',
      'main': 'Начинки'
    };
    return names[currentTabName];
  }

  const addToConstructor = (ingredient: TBurgerIngredient) => {                
    addIngredient(ingredient);
  }

  return ( 
    <section className={burgerIngredientsStyles.container}>
      <div className="mb-1 text text_type_main-large">
        Соберите бургер
      </div>
      <ul className={`mb-3 ${burgerIngredientsStyles.tabs}`}>
        <li>
          <Link isHashLink to="#bun">
            <Tab
              value="bun"              
              active={currentTab === "bun"}              
              onClick={() => setCurrentTab("bun")}>
                Булки
            </Tab>
          </Link>
        </li>              
        <li>
          <Link isHashLink to="#sauce">
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={() => setCurrentTab("sauce")}>
                Соусы                
            </Tab>
          </Link>
        </li>
        <li>
          <Link isHashLink to="#main">
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={() => setCurrentTab("main")}>                
                Начинки
            </Tab>
          </Link>
          </li>
      </ul>
      <Spinner isLoading={isIngredientsLoading} />
      <div className={`pr-1 ${burgerIngredientsStyles.tableWrapper}`}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const targetTop = target.getBoundingClientRect().y;
          if (
            document.getElementById('bun') ||
            document.getElementById('sauce') ||
            document.getElementById('main')
            ) {            
            const bunElTop = document.getElementById('bun')!.getBoundingClientRect().y-targetTop;
            const sauceTop = document.getElementById('sauce')!.getBoundingClientRect().y-targetTop;
            const mainElTop = document.getElementById('main')!.getBoundingClientRect().y-targetTop;
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
 
export default BurgerIngredients;