module.exports = {
  core: { builder: "@storybook/builder-vite" },
  stories: ['../stories/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource'
  ]
}