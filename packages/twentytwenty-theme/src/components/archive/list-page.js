import { connect, styled, decode } from "frontity";
import PostItem from "../post/post-item";

const ListPage = ({ state, link }) => {
  // Get the data of the current list.
  const data = state.source.get(link);

  return (
    <>
      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one Item component for each one.
        return <PostItem key={item.id} item={item} />;
      })}
    </>
  );
};

export default connect(ListPage);
