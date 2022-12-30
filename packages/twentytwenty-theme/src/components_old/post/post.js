import { styled, connect } from "frontity";
import { useEffect,useRef,useState } from "react";
import FeaturedMedia from "./featured-media";
import Link from "../link";
import {
  EntryContent,
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
  PostCaption,
  SectionContainer,
} from "./post-item";
import PostCategories from "./post-categories";
import PostMeta from "./post-meta";
import PostTags from "./post-tags";
import leftArrow from "../../assets/images/left-arrow.png"
import { Container, Row, Col, ListGroup, ListGroupItem,TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap"
import Slider from "react-slick";
import playImg from "../../assets/images/play.png"
import sliderLeftArrow from '../../assets/images/slider-left-arrow.png'
import sliderRightArrow from '../../assets/images/slider-right-arrow.png'
import challenges from '../../assets/images/challenges.png'
import notes from '../../assets/images/notes.png'
import solutions from '../../assets/images/solutions.png'
import arrow_down from '../../assets/images/arrow-down.svg'
import classnames from 'classnames';
import { css } from "frontity";
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js";


/**
 * The Post component that the TwentyTwenty theme uses for rendering any kind of
 * "post type" (posts, pages, attachments, etc.).
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Post = ({ state, actions, libraries, props }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Get all categories
  const allCategories = state.source.category;

  /**
   * The item's categories is an array of each category id. So, we'll look up
   * the details of each category in allCategories.
   */
  const categories =
    post.categories && post.categories.map((catId) => allCategories[catId]);

  // Get all tags
  const allTags = state.source.tag;

  /**
   * The item's categories is an array of each tag id. So, we'll look up the
   * details of each tag in allTags.
   */
  const tags = post.tags && post.tags.map((tagId) => allTags[tagId]);
  let checkval = true;
  const slider = useRef();

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [isMobile, setisMobile] = useState(false);

  const [selectedOption,setSelectedOption] = useState([]);

  function handleSelectChange(event) {
      setSelectedOption(event.target.value);
      switch (event.target.value) {
        case 'Challenges':
          toggle('1');
          break;
        case 'Solutions':
          toggle('2');
          break;
        case 'Notes':
          toggle('3');
          break;
      
        default:
          break;
      }
  }

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    if(window.screen.width < 768){
      setisMobile(true);
    }
  }, [actions.source]);

 
  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <PostArticle className="post-inner">
      <Container>
        <Link link="/" className="back"><img src={leftArrow} alt="arrow"/>Back To Portfolio</Link>
      </Container>
        {/* gallery */}
        <div className="showcase common-spacing">
          <Container>
            <Row>
              <Col>
                <div className="common-title">
                  <h2>Project Showcase</h2>
                </div>
              </Col>
            </Row>
          </Container>
          <Slider {...settings} ref={slider}>
            {post.acf.screenshots.map(item => 
              item.gallery.map(function(value,index){
                if(checkval){
                  if(value.split('.').pop() == "mp4"){
                    checkval = false;
                    let next = item.gallery[index+1];
                    return <div className="showcase-item" css={css`background-image: url(${next})`} key={index}>
                      <a href={value} data-fancybox>
                        <img src={playImg} alt="play"/>
                      </a>
                    </div>
                  }
                  else{
                    return <div className="showcase-item" css={css`background-image: url(${value})`} key={index}>
                    </div>
                  }
                }
              })
            )}
          </Slider>
          <ul className="slider-arrows">
            <li><a href="#!" className="left" onClick={() => slider.current.slickPrev()}><img src={sliderLeftArrow} alt="arrow"/></a></li>
            <li><a href="#!" className="right" onClick={() => slider.current.slickNext()}><img src={sliderRightArrow} alt="arrow"/></a></li>
          </ul>
        </div>

        {/* title */}
        <div className="title-block">
          <Container>
            <Row className="align-items-center">
              <Col md="6">
                <PostTitle
                  as="h1"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Col>
              <Col md="6">
                <PostTitle
                  as="h2"
                  dangerouslySetInnerHTML={{ __html: post.acf.secondary_title }}
                />
              </Col>
            </Row>
          </Container>
        </div>

         {/* description */}
        <Container>
          <Row>
            <Col>
              <div className="description">
                {/* If the post has content, we render it */}
                {post.content && (
                  <PostInner size="thin">
                    <EntryContent>
                      <Html2React html={post.content.rendered} />
                    </EntryContent>
                    {/* If the post has tags, render it */}
                    {/* {post.tags && <PostTags tags={tags} />} */}
                  </PostInner>
                )}
              </div>

              {/* If the post has links */}
              {post.acf.test_server_url && post.acf.live_url &&
                <div className="links">
                  <a href={post.acf.test_server_url}>Internal</a>
                  <a href={post.acf.live_url}>Live</a>
                </div>
                }

              {/* sector */}
              {post.categories && <h4 className="sector">Project Sector:&nbsp;<PostCategories categories={categories} /></h4>}
            </Col>
          </Row>
        </Container>

        {/* tags */}
        <div className="tags common-spacing">
          <Container>
            <Row>
              <Col>
                <div className="common-title">
                  <h2>Project Tags</h2>
                </div>
              </Col>
            </Row>
            <Row className="common-block">
              {tags.map(tag =>
                <Col md="4" xl="3">
                  <div className="item">
                    <h3>{tag.name}</h3>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>

        {/* features */}
        <div className="features common-spacing">
          <Container>
            <Row>
              <Col>
                <div className="common-title">
                  <h2>Project Features</h2>
                </div>
              </Col>
            </Row>
            <Row className="common-block">
            {post.acf.features &&
                post.acf.features.map(item =>
                  <Col md="6" xl="3">
                    <div className="item">
                      <h4>{item.feature_item}</h4>
                    </div>
                  </Col>
                )
            }
            </Row>
          </Container>
        </div>

        {/* members */}
        <div className="members common-spacing">
          <Container>
            <Row>
              <Col>
                <div className="common-title">
                  <h2>Team Members</h2>
                </div>
              </Col>
            </Row>
            <Row className="common-block">
            {post.acf.team_members &&
                post.acf.team_members.map(item =>
                  <Col md="6">
                    <div className="item">
                      <div className="member-detail">
                        <h2>{item.name}</h2>
                        <span>{item.designation}</span>
                      </div>
                    </div>
                  </Col>
                )
            }
            </Row>
          </Container>
        </div>

        {/* other members */}
        <div className="other-members common-spacing">
          <Container>
            <Row>
              <Col md="4">
                <div className="common-title">
                  <h2>Project Manager</h2>
                </div>
                <ListGroup unstyled>
                  <ListGroupItem>{post.acf.project_manager}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="4">
                <div className="common-title">
                  <h2>Team Lead</h2>
                </div>
                <ListGroup unstyled>
                  <ListGroupItem>{post.acf.team_lead_reporting_manager}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="4">
                <div className="common-title">
                  <h2>Client Name(s)</h2>
                </div>
                <ListGroup unstyled>
                  <ListGroupItem>{post.acf.client_name.join(",")}</ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>

        

        {/* challenges/notes/solutions */}
        <div className="challenges common-spacing">
            <Container>
              {isMobile ? 
                <select onChange={handleSelectChange} css={css`background-image: url(${arrow_down})`}>
                  <option>Challenges</option>
                  <option>Solutions</option>
                  <option>Notes</option>
                </select>
              :
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      <img src={challenges} alt="challenges"/> Challenges
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      <img src={solutions} alt="solutions"/> Solutions
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      <img src={notes} alt="notes"/> Notes
                    </NavLink>
                  </NavItem>
                </Nav>
              }
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <h2>{post.acf.challenges.map(item => item.challenges_title)}</h2>
                  <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: post.acf.challenges.map(item => item.challenges_content) }} />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <h2>{post.acf.solutions.map(item => item.solutions_title)}</h2>
                  <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: post.acf.solutions.map(item => item.solutions_content) }} />
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <h2>{post.acf.notes.map(item => item.notes_title)}</h2>
                  <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: post.acf.notes.map(item => item.notes_content) }} />
                  </div>
                </TabPane>
              </TabContent>
            </Container>
        </div>

        {/* download pdf */}
        <div className="download common-spacing text-center">
          <h2>Download Full PDF</h2>
          <a href={post.acf.pdf} target="_blank">Click Here</a>
        </div>

    </PostArticle>
  ) : null;
};

export default connect(Post);

const Header = styled(PostHeader)`
  padding: 4rem 0;
  @media (min-width: 700px) {
    padding: 8rem 0;
  }
`;

const PostArticle = styled(_Post)`
  padding-top: 0 !important;
`;

const FeaturedImage = styled(FeaturedMedia)`
  margin-top: 0 !important;
  position: relative;

  > div {
    position: relative;
  }

  &:before {
    background: #fff;
    content: "";
    display: block;
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    top: 0;
  }
`;
