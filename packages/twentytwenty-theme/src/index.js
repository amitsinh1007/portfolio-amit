import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";
import FrontityURL from "frontity/dist/src/utils/url";

const mediaFetch = {
  name: "media",
  priority: 10,
  pattern: "/media",
  func: async ({ link, route, params, state, libraries }) => {
    const { api } = libraries.source;
    const {slug} = params;
    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: '/wp/v2/media'
    });

    // 2. get an array with each item in json format
    const mediaItems = await response.json();

    // 3. add data to source
    const mediaData = state.source.data[link];

    Object.assign(mediaData, {
      mediaData: mediaItems
    });
  }
};
const myCategoriesHandler = {
  pattern: "/filter",
  func: async ({ route, params, state, libraries }) => {
    // Get the page of the current route.
    let cat_ids = ( state.source.filters.categories == "" ? Array() : state.source.filters.categories);
    let tag_ids = ( state.source.filters.tags == "" ? "" : state.source.filters.tags);
    // let current_page = state.source.current_page + 1;
    // let parameters = { _embed: true, "tax_relation": "AND", "per_page": "4", "offset": "0", "order": "asc", "order_by": "id" };
    let parameters = { _embed: true, "tax_relation": "AND"};
    if ( cat_ids != "" ) {
      parameters.categories = cat_ids.join(",");
    }

    if ( tag_ids != "" ) {
      parameters.tags = tag_ids; //tag_ids.join(",");
    }

    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "posts",
      params: parameters
    });
    const items = await libraries.source.populate({
      state,
      response: postsResponse
    });
    const total = libraries.source.getTotal(postsResponse);
    const totalPages = libraries.source.getTotalPages(postsResponse);
    // let nextPage = ( current_page < totalPages ) ? "/page/"+current_page : "";
    // state.source.current_page = current_page;

    // Populate state.source.data with the proper info about this URL.
    Object.assign(state.source.data[route], {
      items,
      total,
      totalPages,
      isArchive: true,
      // next: "/page/2",
    });
  }
};

const myPagesHandler = {
  pattern: "/page/:slug",
  func: async ({ route, params, state, libraries }) => {
    
  }
};

const twentyTwentyTheme = {
  name: "@frontity/twentytwenty-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      colors: {
        gray: {
          base: "#6D6D6D",
          light: "#DCD7CA",
          lighter: "#F5EFE0",
        },
        primary: "#cd2653",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#f5efe0",
      },
      // Whether to show the search button in page header
      showSearchInHeader: true,
      // Menu links to display in the header
      menu: [],
      // State for the menu on mobile
      isMobileMenuOpen: false,
      // State for the search modal on mobile
      isSearchModalOpen: false,
      // Whether to show all post content or only excerpt (summary) in archive view
      showAllContentOnArchive: false,
      // Settings for the featured media (image or video)
      featuredMedia: {
        // Whether to show it on archive view
        showOnArchive: true,
        // Whether to show it on post
        showOnPost: true,
      },
      // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
      autoPrefetch: "in-view",

      /**
       * At the moment, we only include the ascii characters of Inter font.
       * Values can be "us-ascii" | "latin" | "all".
       */
      fontSets: "all",
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR: ({ actions }) => async () => {
        await actions.source.fetch("/media/");
      },
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, link],
    },
    source: {
      handlers: [myCategoriesHandler, mediaFetch, myPagesHandler]
    }
  },
};

export default twentyTwentyTheme;
