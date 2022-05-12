import React from 'react';
import cl from './popUp.module.css';
import { Transition } from 'react-transition-group'
const PopUp = ({ children, visible, setVisible }) => {

  const rootClasses = [cl.myPopUp];
  if (visible) rootClasses.push(cl.active);
  const defautlStyle = {
    transform: 'translateY(-300%)',
    transition: 'all .3s ease-in 0s',
    padding: '25px',
    borderRadius: '15px',
    minWidth: '250px',
    maxWidth: '600px',
    backgroundColor: '#fff',
  }
  const transitionStyles = {
    entering: { transform: 'translateY(-370%)' },
    entered: { transform: 'translateY(0)' },
    exiting: { transform: 'translateY(-300%)' },
    exited: { transform: 'translateY(-300%)' },
  };
  return (
    <div className={rootClasses.join(' ')} onClick={e => setVisible(false)}>
      <Transition
        in={visible}
        timeout={250}
      >
        {state => {
          return (
            <div style={{ ...defautlStyle, ...transitionStyles[state] }} onClick={e => e.stopPropagation()}>
              {children}
            </div>
          )
        }}
      </Transition>
    </div>
  )
};

export default PopUp;