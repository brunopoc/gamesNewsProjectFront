import React, { useEffect } from 'react';
import { Card, styled } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsList } from '../../../store/ducks/articles';
import { ApplicationState } from '../../../store';

const CardStyled = styled(Card)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const SidebarComponent = () => {
  const dispatch = useDispatch();

  const { mostLikedInWeek, mostViewedInWeek } = useSelector(
    (state: ApplicationState) => state.articles,
  );
  console.log(mostLikedInWeek, mostViewedInWeek);

  useEffect(() => {
    dispatch(ActionsList.mostViewedInWeekRequest());
    dispatch(ActionsList.mostLikedInWeekRequest());
  }, []);

  return <CardStyled> - Assuntos em Alta - </CardStyled>;
};

export default SidebarComponent;
