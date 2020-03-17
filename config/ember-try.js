module.exports = function() {
  return {
    useVersionCompatibility: true,

    scenarios: [
      {
        name: 'ember-release',
        allowedToFail: true,
        bower: {
          dependencies: {
            'ember': 'components/ember#release'
          },
          resolutions: {
            'ember': 'release'
          }
        }
      },
    ]
  };
};
