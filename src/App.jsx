import React, {Component} from 'react';
import appStyles from './app.module.css';
import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from './components/burger-constructor';

import ingredients from './data.json';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {ingredients: ingredients, addedIngredients: []};
  }

  addIngredient = (ingredient) => {        
    this.setState(prevState => {
      const length = prevState.addedIngredients.length;
      const index = length === 1 ? length : length - 1;
      prevState.addedIngredients.splice(index, 0, ingredient);    
      this.changeCount(prevState.ingredients, ingredient["_id"]);      
      return {
        addedIngredients: [...prevState.addedIngredients],
        ingredients: [...prevState.ingredients]
      };
    });
  }
  
  changeCount = (ingredients, id, decrease) => {
    ingredients.forEach(item => {
      if (item["_id"] === id) {
        item.count = decrease ?
        Number(item.count || 0) - 1 :
        Number(item.count || 0) + 1;
      }
    });
  }

  removeIngredient = (index) => {
    this.setState(prevState => {
      const removedIngredient = prevState.addedIngredients.splice(index, 1);
      this.changeCount(prevState.ingredients, removedIngredient[0]["_id"], true)
      return {
        addedIngredients: [...prevState.addedIngredients],
        ingredients: [...prevState.ingredients]
      };
    });
  }

  render() {    
    const {addedIngredients} = this.state;

    return (
      <>
        <AppHeader/>
        <main className={`mb-5 ${appStyles.mainContainer}`}>          
          <BurgerIngredients
            addIngredient={this.addIngredient}
            ingredients={ingredients}/>
          <BurgerConstructor
            removeIngredient={this.removeIngredient}
            addedIngredients={addedIngredients}/>
        </main>
      </>
    );
  }
}
 
export default App;
