/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import ingredientDetailsStyles from './ingredient-details.module.css';
import Spinner from '../../components/spinner';
import {useIngredeints, history} from '../../services';
 
const IngredientDetails = ({caption, onClose}) => {
  const dispatch = useDispatch()
  const {id} = useParams();  
  const [{ingredients, isIngredientsLoading}, {fetchIngredientsAction}] = useIngredeints();
  const [details, setDetails] = useState({});
  useEffect(() => {
    !history.location.state && dispatch(fetchIngredientsAction());
  }, [id])
  useEffect(() => {
    setDetails(ingredients.find(ingredient => ingredient._id === id) || {});
  }, [ingredients])
  return (
    <>      
    { isIngredientsLoading ?
      <Spinner isLoading /> :
      <div className={ingredientDetailsStyles.content}>      
        <img className="mb-2" src={details.image_large} alt={details.name}/>
        <span className="text text_type_main-medium mb-4">{details.name}</span>
        <span className="text text_type_main-default mb-5">{details.description}</span>
        <div className={`mt-5 mb-5 ${ingredientDetailsStyles.energy}`}>
          <div className={ingredientDetailsStyles.energyItem}>
            <span className={`text text_type_main-default
            ${ingredientDetailsStyles.energyItem__caption}`}>Калории, ккал</span>
            <span className={`text text_type_digits-default mt-1
            ${ingredientDetailsStyles.energyItem__value}`}>{details.calories}</span>
          </div>
          <div className={ingredientDetailsStyles.energyItem}>
            <span className={`text text_type_main-default
            ${ingredientDetailsStyles.energyItem__caption}`}>Белки, г</span>
            <span className={`text text_type_digits-default mt-1
            ${ingredientDetailsStyles.energyItem__value}`}>{details.proteins}</span>
          </div>
          <div className={ingredientDetailsStyles.energyItem}>
            <span className={`text text_type_main-default
            ${ingredientDetailsStyles.energyItem__caption}`}>Жиры, г</span>
            <span className={`text text_type_digits-default mt-1
            ${ingredientDetailsStyles.energyItem__value}`}>{details.fat}</span>
          </div>
          <div className={ingredientDetailsStyles.energyItem}>
            <span className={`text text_type_main-default
            ${ingredientDetailsStyles.energyItem__caption}`}>Углеводы, г</span>
            <span className={`text text_type_digits-default mt-1
            ${ingredientDetailsStyles.energyItem__value}`}>{details.carbohydrates}</span>
          </div>
        </div>
      </div>
    }
    </>
  );
}
 
export default IngredientDetails;
