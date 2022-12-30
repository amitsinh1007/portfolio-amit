import { connect, Global, css, Head, styled } from "frontity";
import Switch from "@frontity/components/switch";
import globalStyles from "./styles/global-styles";
import FontFaces from "./styles/font-faces";
import Header from "./header";
import Archive from "./archive/";
import Loading from "./loading";
import Post from "./post";
import SearchResults from "./search/search-results";
import SkipLink from "./styles/skip-link";
import MetaTitle from "./page-meta-title";
import PageError from "./page-error";
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';
import customStyle from "../assets/css/style.css"
import slickCss from "slick-carousel/slick/slick.css";
import slickThemeCss from "slick-carousel/slick/slick-theme.css";
import fancyboxStyle from "@fancyapps/ui/dist/fancybox.css";
import { useEffect } from "react";



const BootstrapStyles = () => (
  <Global styles={css(bootstrapCss)} />
);

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ actions, state }) => {
  // Get information about the current URL.
  useEffect(() => {
    if (state.source.apply_filter) {
      state.source.apply_filter = false;
      actions.source.fetch("/filter", { force: true });
      Archive.preload();
    }
  }, [ state.source.filters.tags, state.source.filters.categories ]);

  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add global styles for the whole site, like body or a's or font-faces. 
        Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <BootstrapStyles />
      <Global styles={globalStyles(state.theme.colors)} />
      <Global styles={css(slickCss)} />
      <Global styles={css(slickThemeCss)} />
      <Global styles={css(fancyboxStyle)} />
      <Global styles={css(customStyle)} />
      <FontFaces />

      {/* Add some metatags to the <head> of the HTML. */}
      <MetaTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/> 
      </Head>

      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>

      <div style={{ minHeight: "calc(100vh - 190px)" }}>
        {/* Add the header of the site. */}
        <Header />

        {/* Add the main section. It renders a different component depending
        on the type of URL we are in. */}
        <Main id="main">
          <Switch>
            <Loading when={data.isFetching} />
            <SearchResults when={data.isSearch} />
            <Archive when={data.isArchive} />
            <Post when={data.isPostType} />
            <PageError when={data.isError} />
          </Switch>
        </Main>
      </div>

    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  display: block;
  padding: 25px 0;
  @media (max-width: 767px){
    padding: 25px 0;
  }
`;
