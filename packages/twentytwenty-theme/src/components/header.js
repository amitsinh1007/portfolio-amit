import { connect, styled } from "frontity";
import Link from "./link";
import Navigation from "./navigation/navigation";
import SearchButton from "./search/search-button";
import SearchModal from "./search/search-modal";
import MobileSearchButton from "./mobile/search-button";
import MobileMenuButton from "./mobile/menu-button";
import MobileMenuModal from "./mobile/menu-modal";
import SearchForm from "./search/search-form"
import headerImage from "../assets/images/header-shape.svg"
import { Container} from 'reactstrap';
import { render } from "react-dom";

const Header = ({ state }) => {
  const { title, description, logo } = state.frontity;
  const { headerBg } = state.theme.colors;
  const mediaItems = state.source.get("/media/");

  return (
    <PageHeader bg={headerBg} id="site-header">
      <Container>
        <HeaderInner>
            <StyledLink link="/" >
              
              {mediaItems.mediaData.map(item => {
                console.log({item});
                if(item.id == 757){
                  return(
                    <img src={item.source_url} alt="logo" key={item.id}/> 
                  );
                }
              })}
            </StyledLink>
            <LogoWrapper>
              <StyledLink link="/" >
                <img src={logo} alt="logo" key={logo}/> 
              </StyledLink>
          </LogoWrapper>
          {/* <TitleWrapper>
            {/* Search button on mobile */}
            {/* {state.theme.showSearchInHeader && <MobileSearchButton />} */}

            {/* Heading and Description of the site */}
            {/* <TitleGroup>
              <SiteTitle> {title} </SiteTitle>
              <SiteDescription>{description}</SiteDescription>
            </TitleGroup> */}

            {/* Mobile menu button and modal */}
            {/* <MobileMenuModal /> */}
          {/* </TitleWrapper> */} 

          <HeaderNavigationWrapper>
            {/* Desktop navigation links */}
            <Navigation />
            {/* Desktop search button */}
            {state.theme.showSearchInHeader && <SearchForm />}
          </HeaderNavigationWrapper>
        </HeaderInner>
      </Container>
      {/* Global search modal */}
      <SearchModal />
    </PageHeader>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const TitleGroup = styled.div`
  @media (min-width: 1000px) {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  text-align: center;
  width: 100%;

  @media (min-width: 1000px) {
    width: auto;
    margin-right: 4rem;
    max-width: 50%;
    padding: 0;
    text-align: left;
  }
`;

const LogoWrapper = styled.div`
  width: 15%;
`;

const PageHeader = styled.header`
  z-index: 1;
  background-image: url('${headerImage}');
  position: relative;
`;

const HeaderInner = styled.div`
  align-items: center;
  display: flex;
  padding: 25px 0;
  z-index: 100;
  margin-left: auto;
  margin-right: auto;
`;

const SiteTitle = styled.h1`
  font-size: 30px;
  line-height: 28px;
  font-weight: 700;
  margin: 0 0 0 70px;
 
`;

const SiteDescription = styled.div`
  margin: 0;
  margin-top: 1rem;
  color: #6d6d6d;
  font-size: 1.8rem;
  font-weight: 500;
  display: none;
  letter-spacing: -0.0311em;
  transition: all 0.15s linear;

  @media (min-width: 1000px) {
    margin: 1rem 0 0 2.4rem;
  }

  @media (min-width: 700px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderNavigationWrapper = styled.div`
  display: none;

  @media (min-width: 1000px) {
    align-items: center;
    display: flex;
    margin-left: auto;
  }
`;
