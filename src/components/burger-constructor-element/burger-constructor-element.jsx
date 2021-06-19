import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor-element.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useConstructor} from '../../services';
 
const BurgerConstructorElement = ({
  handleClose,
  price,
  text,
  thumbnail,
  isFirst = false,
  isLast = false,
  draggable = false,
  id,
  index,
  className
}) => {
  const dispatch = useDispatch();  
  const [, {dropConstructorItemAction}] = useConstructor();
  const onDropHandler = ({dragIndex, replaceToIndex}) => {
    dispatch(dropConstructorItemAction({dragIndex, replaceToIndex}));
  }

  const [{isDrag}, dragRef] = useDrag({
    type: "constructor-element",
    item: {dragId: id, dragIndex: index},
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  const [{isHover}, dropTarget] = useDrop({
    accept: "constructor-element",
    drop({dragId, dragIndex}) {
      onDropHandler({dragIndex, replaceToIndex: index});        
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });
  
  return (       
    <div ref={draggable ? dropTarget : null}
      data-test="constructor-element"
      data-testid={`constructor-element-${id}`}>
      <div    
        ref={draggable ? dragRef : null}
        ishover={String(isHover)}
        isdrag={String(isDrag)}
        isdraggable={String(draggable)}
        className={`text text_type_main-default ${burgerConstructorStyles.ingredientWrapper} ${className}`}>
        <div
          edge={String(!draggable)}
          className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>
          <DragIcon />
        </div>
        <ConstructorElement
          type={isFirst ? 'top' : isLast ? 'bottom' : null}
          isLocked={isFirst || isLast}
          handleClose={handleClose}
          price={price}
          text={text}
          thumbnail={thumbnail}/>
      </div>
    </div>
  );
}

BurgerConstructorElement.propTypes = {
  handleClose: PropTypes.func,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number
};
 
export default BurgerConstructorElement;