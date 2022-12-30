const settings = {
  "name": "portfolio",
  "state": {
    "frontity": {
      "url": "https://admin-portfolio.codesert.co.in",
      "title": "Codesert Portfolio",
      "logo": "https://admin-portfolio.codesert.co.in/wp-content/uploads/2022/12/logo-codesert-portfolio.svg",
    }
  },
  "packages": [
    {
      "name": "@frontity/twentytwenty-theme",
      "state": {
        "theme": {
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://admin-portfolio.codesert.co.in/",
          params: {
            per_page: 6,
          },
          'filters': {
            'categories': [],
            'tags': "",
          },
          'search_tag_key': '',
          'apply_filter': false,
          'current_page': 1,
        },
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ]
};

export default settings;
