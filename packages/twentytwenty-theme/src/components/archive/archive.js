import { useArchiveInfiniteScroll } from "@frontity/hooks";
import { connect, styled } from "frontity";
import React from "react";
import Loading from "../loading";
import ListPage from "./list-page";
import { Container, Row, Col, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Select from 'react-select';
import Navigation from "../navigation/navigation";
import { useState, useEffect } from "react";
import searchIcon from "../../assets/images/search.svg"

const Archive = ({ actions, state }) => {

  // useEffect(() => {
  //   if (state.source.apply_filter) {
  //     state.source.apply_filter = false;
  //     actions.source.fetch("/filter", { force: true });
  //     ArchiveList.preload();
  //   }
  // }, [ state.source.filters.tags, state.source.filters.categories ]);

  const data = state.source.get(state.router.link);

  let selectedCat = state.source.filters.categories;
  let selectedTag = state.source.filters.tags;
  let seletedArrayTag = selectedTag.split(",");
  const catitems = state.source.category;
  const tagitems = state.source.tag;

  const cat_options = [], catVal = [];
  for (const property in catitems) {
    let id = catitems[property].id.toString();
    let name = catitems[property].name;
    cat_options.push({ value: id, label: name });
    if (selectedCat.includes(id)) {
      catVal.push({ value: id, label: name });
    }
  }

  const tag_options = [], tagVal = [];
  for (const property in tagitems) {
    let id = tagitems[property].id.toString();
    let name = tagitems[property].name;
    tag_options.push({ value: id, label: name });
    if (seletedArrayTag.includes(id)) {
      tagVal.push({ value: id, label: name, checked: true });
    } else {
      tagVal.push({ value: id, label: name, checked: false });
    }
  }
  // console.log(tagVal);
  const [tags, setTags] = useState(tagVal);

  let tagsarr = [];
  function searchTags(event) {
    let searctText = event.target.value;
    for (let property in tagitems) {
      let id = tagitems[property].id.toString();
      let name = tagitems[property].name;
      if (name.includes(searctText)) {
        tagsarr.push({ value: id, label: name, checked: false });
      }
    }
    setTags(tagsarr)
    return tagsarr;
  }


  const filterPostsByCategory = (event) => {

    state.source.apply_filter = true;
    let selectedCatItem = [];
    event.map((item) =>
      selectedCatItem.push(item.value)
    )
    // console.log(selectedCatItem);
    state.source.filters.categories = selectedCatItem;
    actions.router.set("/filter");
  }

  const filterPostsByTags = (event) => {

    state.source.apply_filter = true;
    if (event.target.checked) {
      seletedArrayTag.push(event.target.value);
    } else {
      let index_tag = seletedArrayTag.indexOf(event.target.value);
      seletedArrayTag.splice(index_tag, 1);
    }
    selectedTag = seletedArrayTag.join(",");
    console.log(seletedArrayTag);
    state.source.filters.tags = selectedTag;
    actions.router.set("/filter");
  }

  const {
    pages,
    isLimit,
    isFetching,
    isError,
    fetchNext
  } = useArchiveInfiniteScroll({ limit: 1 });

  return (
    <>
      <Container>
        <Row>
          <HeaderNavigationWrapper>
            {/* Desktop navigation links */}
            <Navigation />
          </HeaderNavigationWrapper>
        </Row>
        <Row>
          <Col xl="8">
            { data.items &&
            pages.map(({ key, link, isLast, Wrapper }) => (
                <Wrapper key={key}>
                <Row className="post-list">
                    <ListPage link={link} />
                </Row>
                </Wrapper>
            ))
            }
            { data.items.length == 0 &&
                <div> No Records Found. </div>
            }
            <div className="text-center">
                {isFetching && <Loading />}
                {isLimit && <Button onClick={fetchNext} className="load-more">Load More</Button>}
                {isError && (
                <Button onClick={fetchNext}>Something failed - Retry</Button>
                )}
            </div>
          </Col>
          <Col xl="4">
            <Form id="FilterForm" className="d-none d-xl-block" >
              <div className="filter">
                <h4>Category</h4>
                <Select id="filterCategory" onChange={filterPostsByCategory} instanceId="filterCategory" name="filterCategory" className="select" defaultValue={catVal} placeholder="Sector" options={cat_options} isMulti />
              </div>
              <div className="filter">
                <h4>Tags</h4>
                <FormGroup>
                  <InputGroup>
                    <Input type="text" name="tags" id="serachtag" placeholder="Tags" onChange={searchTags} />
                    <InputGroupAddon addonType="append">
                      <InputGroupText><img src={searchIcon} alt="search" /></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="scroll">
                  <div className="tags-list">
                    {tags && tags.map((item, index) =>
                      <FormGroup check key={index}>
                        <Input type="checkbox" value={item.value} defaultChecked={item.checked ? true : false} name="check" id={'check-' + index} onChange={filterPostsByTags} />
                        <Label for={'check-' + index} check>{item.label}</Label>
                      </FormGroup>
                    )
                    }
                  </div>
                </FormGroup>
                {/* <Select id="filterTag"  instanceId="filterTag" name="filterTag" className="select" defaultValue={tagVal} placeholder="Tags" options={tag_options} isMulti /> */}
              </div>
              {/* <div className="filter">
                <Button type="submit" >Filter</Button>
              </div> */}
            </Form>
            {/* {catVal && <div style={{ marginTop: 20, lineHeight: '25px' }}>
              <div><b>Selected Value: </b> {JSON.stringify(catVal, null, 2)}</div>
            </div>} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(Archive);
const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Button = styled.button`
  position: relative;
  background: #1f38c5;
  color: white;
  padding: 12px;
  font-weight: bold;
  border: none;
`;
const HeaderNavigationWrapper = styled.div`
  display: none;
  margin: 24px;
  @media (min-width: 1000px) {
    align-items: center;
    display: flex;
  }
`;
