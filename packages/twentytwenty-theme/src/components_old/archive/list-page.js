import { connect } from "frontity";
const ListPage = ({ state, link }) => {
    // Get the data of the current list.
    const data = state.source.get(link);

    return (
        <>
        {/* Iterate over the items of the list. */}
        {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            // Render one Item component for each one.
            return (
                <>
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
                </>
            );
        })}
        </>
    );
};

export default connect(ListPage);