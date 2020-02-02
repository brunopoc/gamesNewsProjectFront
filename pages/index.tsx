import React from 'react';
import { Container, Box, Grid, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Articles from '../src/components/organisms/Articles';

interface Author {
  name: string;
  id: number;
}

interface Article {
  id: number;
  createdAt: string;
  title: string;
  author: Author;
  resume: string;
  likes: number;
  commentsCount: number;
  image: string;
}

const Main = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const CardStyled = styled(Card)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const Index: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 2,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 3,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 4,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 5,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 6,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 7,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 8,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 9,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
    {
      id: 10,
      createdAt: '01/01/2000',
      title: 'Novo Xbox anunciado!',
      author: { name: 'Minerinho123', id: 2 },
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida aliquam nisl in pharetra. Sed dapibus rhoncus risus a condimentum. Nulla facilisi. Maecenas sit amet ipsum a massa laoreet consequat sed sed neque.',
      likes: 12,
      commentsCount: 5,
      image:
        'https://img.olhardigital.com.br/uploads/acervo_imagens/2019/12/r16x9/20191213081815_1200_675_-_xbox_series_x.jpg',
    },
  ];

  return (
    <Container fixed>
      <Main>
        <Grid container spacing={2}>
          <Grid container item xs={8}>
            <Articles articles={articles} />
          </Grid>
          <Grid container item xs={4}>
            <CardStyled> - Assuntos em Alta - </CardStyled>
          </Grid>
        </Grid>
      </Main>
    </Container>
  );
};

export default Index;
