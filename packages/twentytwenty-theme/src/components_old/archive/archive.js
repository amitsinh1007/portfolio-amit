import { connect, decode,useConnect } from "frontity";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../post/post-item";
import ArchiveHeader from "./archive-header";
import Pagination from "./archive-pagination";
import PostSeparator from "../post/post-separator";
import Post from "../post";
import { Container, Row, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import Select from 'react-select';
import searchIcon from "../../assets/images/search.svg"
import filterIcon from "../../assets/images/filter-icon.svg"
import Scrollbar from 'smooth-scrollbar';
import useInfiniteScroll from "@frontity/hooks/use-infinite-scroll"
import listPage from "./list-page";

const Archive = ({ state, showExcerpt, showMedia, category, actions}) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const { primary } = state.theme.colors;
  // Whether the show the excerpt instead of the full content
  // If passed as prop, we'll respect that. Else, we'll use the theme settings
  const _showExcerpt = showExcerpt || !state.theme.showAllContentOnArchive;
  
  // custom posts
  const custom_posts = state.source.get("/cposts");

  // category list
  const catitems = state.source.category;
  
  let cat_options,c_arr = [];
  custom_posts.currentPostData.map(item => 
   item.category.map(i => 
      c_arr.push(i.name)
    )
  );
  Object.entries(catitems).map(([key, val]) => (
    c_arr.push(val.name)
  ));
  let c_result = [...new Set(c_arr)];
  cat_options = [];
  for (let i = 0; i < c_result.length; i++){
    cat_options.push({value: c_result[i], label: c_result[i]});
  }

  const [catVal, setCatVal] = useState([]);
  const filterCatVal = [];
  function handleSectorChange(e){
    setCatVal(e)
  };
  catVal.map(item => {
    filterCatVal.push(item.value)
  })

  // tags list
  const tagitems = state.source.tag;
  let tag_options,t_arr = [];
  Object.entries(tagitems).map(([key, val]) => (
    t_arr.push(val.name)
  ));
  let t_result = [...new Set(t_arr)];
   tag_options = [];
   for (let i = 0; i < t_result.length; i++){
    tag_options.push({value: t_result[i], label: t_result[i]});
   }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //tagsearch
  const [tagVal, setTagVal] = useState('');
  
  // tagFilter
  const [filterTagPost, setFilterTagPost] = useState([]);
  function filterTagPosts(event){
    var updatedList = [...filterTagPost];
    if (event.target.checked) {
      event.target.nextSibling.classList.add('active');
      updatedList = [...filterTagPost, event.target.nextSibling.textContent.toLowerCase()];
    } else {
      event.target.nextSibling.classList.remove('active');
      updatedList.splice(filterTagPost.indexOf(event.target.nextSibling.textContent.toLowerCase()), 1);
    }
    setFilterTagPost(updatedList);
  }

  const [page, setPage] = useState(1);
  state.source.params = {
    '_embed': true,
    'page': page
  }
  const [loading, setLoading] = useState(false);
  function loadMorePosts(){
    setLoading(true);
    setPage(page + 1);
  }
  actions.router.set('/page/'+ page);
  console.log(page)
  // useEffect(() => {
  //   if(filterTagPost.length > 0){
  //     actions.router.set('?tag='+filterTagPost)
  //   }
  // },[filterTagPost])
  console.log(filterTagPost)
  
  // navigate
  function navigateURL(){
    // const navigate = useNavigate();
    // navigate(`/?tag=${filterTagPost}`)
  }
  
  const {
    link,
    fetchInViewOptions,
    routeInViewOptions
  } = useInfiniteScroll({ limit: 1 });

  useEffect(() => {
    // Scrollbar.init(document.querySelector('.scroll'), {
    //   alwaysShowTracks: true
    // });
    Post.preload();
  }, []);
  return (
    <>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <ArchiveHeader labelColor={primary} label={data.taxonomy}>
          <span>{decode(state.source[data.taxonomy][data.id].name)}</span>
        </ArchiveHeader>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader labelColor={primary} label="Author">
          <b>{decode(state.source.author[data.id].name)}</b>
        </ArchiveHeader>
      )}

    <Container>
      <Row>
        <Col xl="8">       
          <Row className="post-list">
              {/* Iterate over the items of the list. */}
              {/* {data.items.map(({ type, id }, index) => {
                const isLastArticle = index === data.items.length - 1;
                const item = state.source[type][id];
                // Render one Item component for each one.
                return (
                  <Col md="6" lg="4" key={item.id}>
                    <Fragment>
                      <Article
                        item={item}
                        showExcerpt={_showExcerpt}
                        showMedia={showMedia}
                      />
                      {!isLastArticle}
                      </Fragment>
                  </Col>
                );
              })} */}
               {
                  custom_posts.currentPostData.map((item) =>{
                    return (
                      <Col md="6" lg="4" key={item.id}>
                        <Fragment>
                          <Article
                            item={item}
                          />
                          </Fragment>
                      </Col>
                    );
                  }) 
                }
          </Row>
          <div className="text-center">
            {loading ? 
              <Button className="load-more loading">
                <span class="sk-chase">
                  <span class="sk-chase-dot"></span>
                  <span class="sk-chase-dot"></span>
                  <span class="sk-chase-dot"></span>
                  <span class="sk-chase-dot"></span>
                  <span class="sk-chase-dot"></span>
                  <span class="sk-chase-dot"></span>
                </span>
              </Button>
              :
              <Button className="load-more" onClick={() => loadMorePosts()}>Load More</Button>
            }
          </div>
        </Col>
        <Col xl="4">
          <Form className="d-none d-xl-block">
            <div className="filter">
              <h4>Sector</h4>
              <Select className="select" defaultValue={catVal} onChange={handleSectorChange} placeholder="Sector" options={cat_options} isMulti />
            </div>
            <div className="filter">
              <h4>Tags</h4>
                <FormGroup>
                  <InputGroup>
                    <Input type="text" name="tags" placeholder="Tags" value={tagVal} onChange={event => {setTagVal(event.target.value)} } />
                    <InputGroupAddon addonType="append">
                      <InputGroupText><img src={searchIcon} alt="search"/></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="scroll">
                  <div className="tags-list">
                    { t_arr.map((tagItem,index) => (
                      <FormGroup check key={index}>
                        <Input type="checkbox" name="check" id={'check-'+ index} onChange={filterTagPosts}/>
                        <Label for={'check-'+ index} check>{tagItem}</Label>
                      </FormGroup>
                      ))
                    }
                  </div>
                </FormGroup>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
      <div className="filter-mob d-block d-xl-none">
          <a href="#!" onClick={toggle}><img src={filterIcon} alt="filter"/></a>
          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle}>Filter</ModalHeader>
            <ModalBody>
              <div className="filter-block">
                <div className="filter">
                  <h4>Sector</h4>
                  <Select className="select" placeholder="Sector" options={cat_options} isMulti/>
                </div>
                <div className="filter">
                  <h4>Tags</h4>
                  <Select className="select" placeholder="Tags" options={tag_options} isMulti/>
                </div>
              </div>
            </ModalBody>
          </Modal>
      </div>         
    </>
  );
};

export default connect(Archive);
