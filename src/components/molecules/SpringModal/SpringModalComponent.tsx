import React from 'react';
import { Modal, Backdrop, styled, Box } from '@material-ui/core';
import { useSpring, animated } from 'react-spring/web.cjs';

const ModalStyled = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5px',
});

const PaperStyled = styled(Box)({
  border: '2px solid #000',
  padding: '5px',
  backgroundColor: '#fff',
  borderRadius: '5px',
});

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

type OwnProps = {
  open: boolean;
  handleClose: (...args: any[]) => void;
  title: string;
  text: string;
  children?: React.ReactNode;
};

const SpringModalComponent = ({ open, handleClose, title, text, children }: OwnProps) => {
  return (
    <ModalStyled
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <PaperStyled>
          <h2 id="spring-modal-title">{title}</h2>
          <p id="spring-modal-description">{text}</p>
          {children}
        </PaperStyled>
      </Fade>
    </ModalStyled>
  );
};

export default SpringModalComponent;
