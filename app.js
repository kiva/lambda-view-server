const Apollo = require('apollo-client');
const fetch = require('isomorphic-fetch'); // eslint-disable-line no-unused-vars
const gql = require('graphql-tag');

module.exports = w => {
  const enableEvents = typeof window !== 'undefined'; // only enable events if we are in the browser
  const initialRoute = w.location.pathname.replace(w.document.querySelector('base').getAttribute('href'), '').replace('/','');
  const routes = [
    {route:'agriculture', title:'Agriculture'},
    {route:'food', title:'Food'},
    {route:'retail', title:'Retail'}
  ];
  const sectors = {
    'agriculture': 1,
    'food': 12,
    'retail': 7
  };

  const client = new Apollo.ApolloClient({
    networkInterface: Apollo.createNetworkInterface({
      uri: 'https://api.kivaws.org/graphql'
    })
  });

  // get loan data from the graphql endpoint
  const query = sector => client.query({
    query: gql`{
      loans(limit: 3, filters: {
        sector: ${sector}
      }) {
        values { name, use, image { url(presetSize: loan_default) } }
      }
    }`
  });

  // attach dom event handlers after render
  const onRender = () => {
    // navigate on the client when links are clicked
    w.document.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        const route = event.target.getAttribute('href');
        w.history.pushState(route, `view:${route}`, route);
        render({route, loans:[]});
        query(sectors[route]).then(result => {
          render({
            route,
            loans: result.data && result.data.loans && result.data.loans.values || []
          });
        })
      });
    });
  };

  // render to the dom using context ctx
  const render = ctx => {
    const existingRoot = w.document.getElementById('root');
    const newRoot = w.document.createElement('div');
    newRoot.id = 'root';

    newRoot.innerHTML = `
      ${routes.reduce((html, {route,title}) => `${html}
        ${route === ctx.route ? `
          <span>${title}</span>
        ` : `
          <a href="${route}">${title}</a>
        `}
      `,'')}
      <ul>
      ${ctx.loans.reduce((html, loan) => `${html}
        <li>
          <img src="${loan.image.url}" alt="Picture of ${loan.name}">
          <h2>${loan.name}</h2>
        </li>
        `,'')}
      </ul>
    `;

    if(existingRoot) {
      w.document.body.replaceChild(newRoot, existingRoot);
    }
    else {
      w.document.body.insertBefore(newRoot, w.document.body.firstChild);
    }

    if(enableEvents) {
      onRender();
    }
  };

  // attach browser navigation event handler
  if(enableEvents) {
    // update page if back/forward used
    w.addEventListener('popstate', event => {
      render({route: event.state});
    });
  }

  // initial fetch/render
  return new Promise((resolve, reject) => {
    if(sectors[initialRoute] === undefined) {
      render({
        route: initialRoute,
        loans: []
      });
      resolve();
    }
    else {
      query(sectors[initialRoute]).then(result => {
        render({
          route: initialRoute,
          loans: result.data && result.data.loans && result.data.loans.values || []
        });
        resolve();
      }).catch(err => reject(err));
    }
  });
}
