import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

export const Aside = styled.aside`
  min-width: 256px;
`;

export const Profile = styled.div`
  width: 100%;
  margin: 0px 20px 20px 20px;
  padding: 20px;
  box-shadow: 2px 2px 5px 1px grey;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: 800;
  padding-bottom: 10px;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e5e5;
`;

export const Picture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-bottom: 30px;
`;

export const Menu = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

export const MenuButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #c13535;
  font-weight: 600;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border-style: unset;
  border-bottom: 1px solid #c13535;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: 0.2s color, 0.2s background-color, 0.2s border-bottom;
  &:hover {
    background-color: #fff;
    color: #f15656;
    border: 1px solid #f15656;
  }
  &:active {
    background-color: #fff;
    color: #a12a2a;
    border: 1px solid #a12a2a;
  }
`;

export const Level = styled.span`
  color: #b2b2b2;
  margin: 10px auto;
  font-weight: 600;
`;

export const SlideGroup = styled.div`
  max-height: 600px;
  height: 100%;
  width: 100%;
  background-color: #e5e5e5;
  border-bottom: 1px solid #dfdfdf;
`;

export const Slide = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 400px;
  margin: 10px;
  max-width: 95%;
  background-color: #fff;
  box-shadow: 2px 2px 5px 1px grey;
`;

export const SlideImage = styled.img`
  max-height: 200px;
  max-width: 80%;
  width: auto;
  height: auto;
  border-radius: 5px;
`;

export const SlideSpan = styled.span`
    background-color: rgba(0, 0, 0, .5);
    font-size: 20px;
    padding: 10px;
    color: #fff;
    width: 100%;
    text-align: center;
    margin: 20px 0px;
`;

export const SlideLikes = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const SlideAuthor = styled.span`
    font-style: italic;
    color: #b2b2b2;
    margin: 15px;
    border-bottom: 1px solid #e5e5e5;
`;
