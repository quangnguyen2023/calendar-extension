import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

export default defineManifest({
  manifest_version: 3,
  name: 'Lịch âm dương Việt Nam',
  version: pkg.version,
  description: 'Lịch âm dương Việt Nam - Xem nhanh ngày âm lịch, ngày dương lịch.',
  icons: {
    16: 'public/logo-16.png',
    48: 'public/logo-48.png',
    128: 'public/logo-128.png',
  },
  action: {
    default_icon: {
      16: 'public/logo-16.png',
      48: 'public/logo-48.png',
      128: 'public/logo-128.png',
    },
    default_popup: 'src/popup/index.html',
  },
  // permissions: ['sidePanel', 'contentSettings'],
  // content_scripts: [{
  //   js: ['src/content/main.tsx'],
  //   matches: ['https://*/*'],
  // }],
  // side_panel: {
  //   default_path: 'src/sidepanel/index.html',
  // },
});
