import React, {FC} from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
  onClick: () => void
};

const ModalOverlay: FC<IModalOverlay> = ({onClick}) => {
  return (
    <div className={modalOverlayStyles.overlay}
      onClick={function(e) {
        e.stopPropagation();
        onClick && onClick();
      }}>
    </div>
  );
}
 
export default ModalOverlay;
