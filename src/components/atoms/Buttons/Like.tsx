import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { styled, Box, Popper } from '@material-ui/core';
import { ActionsList } from '../../../store/ducks/articles';
import { ApplicationState } from '../../../store';

const LikeContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const TooltipContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid',
  borderRadius: '5px',
  backgroundColor: '#fff',
  fontWeight: 600,
});

type OwnProps = {
  articleId: string;
  articleLikes: number;
};

const Like = (props: OwnProps) => {
  const dispatch = useDispatch();
  const { likedPosts, id } = useSelector((state: ApplicationState) => state.user.data.data);
  const { logged } = useSelector((state: ApplicationState) => state.user);
  const { articleId, articleLikes } = props;
  const likedLength =
    likedPosts &&
    likedPosts.filter(like => {
      return like === articleId;
    })?.length;
  const liked = likedLength > 0;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const idHover = open ? 'simple-popper' : undefined;

  const handleHouver = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLike = () => {
    if (logged) {
      if (liked) {
        // eslint-disable-next-line no-plusplus
        for (let i = likedPosts.length - 1; i >= 0; i--) {
          if (likedPosts[i] === articleId) {
            likedPosts.splice(i, 1);
          }
        }
      } else {
        likedPosts.push(articleId);
      }

      const data = {
        action: liked ? 'notLiked' : 'Liked',
        id: articleId,
        likedPosts,
        userId: id,
      };
      dispatch(ActionsList.updateLikeRequest(data));
    }
  };

  return (
    <div
      onMouseOut={handleHouver}
      onFocus={handleHouver}
      onBlur={handleHouver}
      onMouseOver={handleHouver}
    >
      <LikeContainer component="div" onClick={handleLike}>
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {articleLikes}
      </LikeContainer>
      {!logged && (
        <Popper id={idHover} open={open} anchorEl={anchorEl}>
          <TooltipContainer>Você precisa estar logado para curtir</TooltipContainer>
        </Popper>
      )}
    </div>
  );
};

export default Like;
