module.exports = function() {
  return {
    scenarios: [
      {
        name: 'default',
        bower: {
          dependencies: { }
        }
      },
      {
        name: 'ember-lts-2.8',
        bower: {
          dependencies: {
            'ember': 'components/ember#lts-2-8'
          },
          resolutions: {
            'ember': 'lts-2-8'
          }
        }
      },
      {
        name: 'ember-2.13',
        bower: {
          dependencies: {
            'ember': 'components/ember#2.13.4'
          },
          resolutions: {
            'ember': '2.13.4'
          }
        }
      },
      {
        name: 'ember-2.18',
        bower: {
          dependencies: {
            'ember': 'components/ember#2.18.2'
          },
          resolutions: {
            'ember': '2.18.2'
          }
        }
      }
    ]
  };
};
