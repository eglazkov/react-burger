import React, {FC} from 'react';
import orderCardStyles from './ingredient-icon.module.css';

interface IIngredientIcon {
  src: string,
  alt: string,
  count?: string
}

const IngredientIcon: FC<IIngredientIcon> = ({
  src,
  alt,
  count
}) => {
  
  return (
    <div
      data-count={count}
      className={`text text_type_digits-default ${orderCardStyles.ingredientIconBorder}`}>
        <img className={orderCardStyles.ingredientIcon} src={src} alt={alt} />        
    </div>
  );
}
 
export default IngredientIcon;
