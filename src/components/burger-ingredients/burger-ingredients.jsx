import React, {Component} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredient extends Component {

  state = {
    count: 0
  }

  increaseCounter = () => {
    this.setState(prevState => {
      return {count: prevState.count + 1}
    })
  }

  render() { 
    const {image, price, name, count} = this.props;
    // const {count} = this.state;
    return ( 
      <div
        onClick={this.increaseCounter}
        className={`mb-4 ${burgerIngredientsStyles.ingredient}`}>
        {count > 0 && <span className={burgerIngredientsStyles.counter}>
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
     );
  }
}
 
class BurgerIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "bun", 
      ingredientsOnTab: props.ingredients.filter(ingredient => ingredient.type === 'bun')
    }
  }

  setCurrentTab = (tabName) => {
    this.setState({
      currentTab: tabName,
      ingredientsOnTab: this.getIngredientsByTab(tabName)
    });
  }

  getIngredientsByTab = (tabName) => {
    const {ingredients} = this.props;
    return [...ingredients.filter(ingredient => ingredient.type === tabName)];
  }
  
  getHeader = (currentTabName) => {
    const names = {
      'bun': 'Булки',
      'sauce': 'Соусы',
      'main': 'Начинки'
    };
    return names[currentTabName];
  }

  render() { 
    const {addIngredient} = this.props;
    const {currentTab, ingredientsOnTab} = this.state;
    return ( 
      <section className={burgerIngredientsStyles.container}>
        <div className="mb-1 text text_type_main-large">
          Соберите бургер
        </div>
        <ul className={`mb-3 ${burgerIngredientsStyles.tabs}`}>
          <li><Tab
                value="bun"
                active={currentTab === "bun"}
                onClick={(value) => this.setCurrentTab(value)}>Булки</Tab></li>
          <li><Tab
                value="sauce"
                active={currentTab === "sauce"}
                onClick={(value) => this.setCurrentTab(value)}>Соусы</Tab></li>
          <li><Tab
                value="main"
                active={currentTab === "main"}
                onClick={(value) => this.setCurrentTab(value)}>Начинки</Tab></li>
        </ul>
        <div className={`pr-1 ${burgerIngredientsStyles.tableWrapper}`}>
          <div className="text text_type_main-medium mb-3">
            {this.getHeader(currentTab)}
          </div>
          <div className={burgerIngredientsStyles.table}>
            {ingredientsOnTab.map(ingredient => {
              const {_id} = ingredient;
              return (
                <div
                  onClick={(e) => {                
                    addIngredient(ingredient);
                  }}          
                  key={_id}>
                  <div>
                    <BurgerIngredient {...ingredient}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
     );
  }
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired,
  addIngredient: PropTypes.func.isRequired
};
 
export default BurgerIngredients;