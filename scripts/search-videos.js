/* global hexo */
'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Merge Bilibili video entries into the local-search index (search.xml)
 * so that the site search can find videos as well as posts.
 *
 * Data source: source/_data/videos-search.json  (generated from bili data)
 * Each entry: { id, title, desc, url, date, season }
 *
 * NOTE: hexo's `after_generate` filter runs BEFORE routes are flushed to
 * disk, so at that point public/search.xml is still the previous build (or
 * missing after `hexo clean`). The `exit` hook fires after all files are
 * written, which is where we merge.
 */
function mergeSearchIndex() {
  const xmlPath = path.join(hexo.public_dir, 'search.xml');
  const dataPath = path.join(hexo.source_dir, '_data', 'videos-search.json');

  if (!fs.existsSync(xmlPath) || !fs.existsSync(dataPath)) {
    return;
  }

  let xml;
  try {
    xml = fs.readFileSync(xmlPath, 'utf8');
  } catch (e) {
    return;
  }
  if (xml.indexOf('data-video-entry') !== -1) {
    return; // already merged
  }

  let items;
  try {
    items = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    hexo.log.warn('[search-videos] failed to parse videos-search.json: ' + e.message);
    return;
  }
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  const esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const cdata = function (s) {
    return String(s == null ? '' : s).replace(/\]\]>/g, ']]]]><![CDATA[>');
  };

  const entries = items.map(function (v) {
    return [
      '  <entry data-video-entry="1">',
      '    <title>' + esc(v.title) + '</title>',
      '    <url>' + esc(v.url) + '</url>',
      '    <content><![CDATA[' + cdata(v.desc) + ']]></content>',
      '  </entry>'
    ].join('\n');
  }).join('\n');

  const out = xml.replace('</search>', entries + '\n</search>');
  if (out === xml) {
    hexo.log.warn('[search-videos] </search> not found, skip');
    return;
  }

  try {
    fs.writeFileSync(xmlPath, out);
    hexo.log.info('[search-videos] merged ' + items.length + ' video entries into search.xml');
  } catch (e) {
    hexo.log.warn('[search-videos] write failed: ' + e.message);
  }
}

hexo.on('exit', function () {
  // Deferred: the CLI may still be flushing stdout; merging is idempotent.
  try {
    mergeSearchIndex();
  } catch (e) {
    hexo.log.warn('[search-videos] exit hook error: ' + e.message);
  }
});
