import React, {FC} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from 'react-redux';
import burgerConstructorStyles from './burger-constructor-element.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useConstructor} from '../../services';

interface IBurgerConstructorElement {
  handleClose?: () => void,
  price: number,
  text: string,
  thumbnail: string,
  isFirst?: boolean,
  isLast?: boolean,
  draggable?: boolean,
  id: string,
  index?: number,
  className: string
};

const BurgerConstructorElement: FC<IBurgerConstructorElement> = ({
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
  const onDropHandler = ({dragIndex, replaceToIndex}: {dragIndex: number, replaceToIndex: number | undefined}) => {
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
    drop(item: {dragIndex: number}) {
      onDropHandler({dragIndex: item.dragIndex, replaceToIndex: index});        
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });
  
  return (       
    <div ref={draggable ? dropTarget : null}
      data-test-id="constructor-element">
      <div    
        ref={draggable ? dragRef : null}
        data-testid={`constructor-element-${id}`}
        data-ishover={String(isHover)}
        data-isdrag={String(isDrag)}
        data-isdraggable={String(draggable)}
        className={`text text_type_main-default ${burgerConstructorStyles.ingredientWrapper} ${className}`}>
        <div
          data-edge={String(!draggable)}
          className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          type={isFirst ? 'top' : isLast ? 'bottom' : undefined}
          isLocked={isFirst || isLast}
          handleClose={handleClose}
          price={price}
          text={text}
          thumbnail={thumbnail}/>
      </div>
    </div>
  );
}
 
export default BurgerConstructorElement;