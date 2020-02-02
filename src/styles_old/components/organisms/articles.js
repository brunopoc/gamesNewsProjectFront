import styled from "styled-components";

export const Section = styled.section`
  max-width: 768px;
  width: 100%;
  margin: auto;
`;

export const Article = styled.article`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 2px 2px 5px 1px grey;
  display: flex;
  align-items: center;
  border-radius: 2px;
`;

export const Image = styled.img`
  width: 180px;
  max-height: 100px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const ArticleFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Author = styled.span`
  font-style: italic;
  color: #b2b2b2;
  cursor: pointer;
`;

export const Comments = styled.span`
  color: #b2b2b2;
  cursor: pointer;
`;

export const Like = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Description = styled.div`
  margin: 5px 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E5E5E5;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const Date = styled.div`
  font-style: italic;
  color: #b2b2b2;
`;