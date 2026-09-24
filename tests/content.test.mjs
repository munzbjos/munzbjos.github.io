import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projects, workOrder, researchOrder, homeWork, homeResearch, getProject } from '../src/data/projects.ts';

const catalog = readFileSync(new URL('../portfolio_catalog.md', import.meta.url), 'utf8');
const blocks = catalog.split(/^## /m).slice(1);
const strip = text => text.replace(/[*`]/g, '').trim();
function section(block, name) {
  const marker = `### ${name}\n`;
  const start = block.indexOf(marker);
  return start < 0 ? '' : block.slice(start + marker.length).split(/\n### |\n---/)[0].trim();
}
const list = (block, name) => section(block, name).split('\n').filter(line => line.startsWith('- ')).map(line => strip(line.slice(2)));

test('all eleven approved projects exist exactly once', () => {
  assert.equal(projects.length, 11);
  assert.equal(new Set(projects.map(project => project.slug)).size, 11);
  assert.equal(blocks.length, projects.length);
});

for (const block of blocks) {
  const title = block.split('\n')[0].trim();
  const metadata = Object.fromEntries([...block.matchAll(/^- \*\*([^:]+):\*\* (.+)$/gm)].map(match => [match[1], strip(match[2])]));
  test(`approved wording and metadata preserved: ${title}`, () => {
    const project = getProject(metadata.Slug);
    assert.equal(project.title, title);
    for (const [key, source] of Object.entries({year: 'Year', author: 'Author', role: 'Role', type: 'Type', location: 'Location', project: 'Project', funding: 'Funding', displayStatus: 'Display status', cardLabel: 'Card label', detailSubtitle: 'Detail subtitle'})) {
      assert.equal(project[key], metadata[source]);
    }
    assert.deepEqual(project.sections, metadata.Section.split(', '));
    assert.equal(project.shortDescription, section(block, 'Short description'));
    assert.deepEqual(project.extendedNote, section(block, 'Extended note').split('\n\n').map(strip));
    for (const [key, name] of Object.entries({keywords: 'Keywords', tools: 'Tools', awards: 'Awards', dataCredits: 'Data', projectWebsites: 'Project website'})) {
      assert.deepEqual(project[key], list(block, name));
    }
    const publicationSource = section(block, 'Publications');
    assert.deepEqual(project.publications.map(publication => publication.citation), list(block, 'Publications'));
    for (const publication of project.publications) {
      assert.ok(publicationSource.includes(publication.url));
      assert.ok(publicationSource.includes(publication.title));
    }
    const outputSource = section(block, 'Interactive outputs') || section(block, 'Interactive output');
    assert.equal(project.interactiveOutputs[0]?.displayLabel, metadata['Interactive output display label']);
    assert.deepEqual(project.interactiveOutputs.map(output => output.url), [...outputSource.matchAll(/https:\/\/\S+/g)].map(match => match[0]));
    if (project.teachingContext) {
      assert.deepEqual(Object.values(project.teachingContext), list(block, 'Teaching context'));
    }
  });
}

test('curatorial order and cross-listing are intentional', () => {
  assert.deepEqual(workOrder, ['prague-squared', 'joyplot', 'dantes-inferno', 'tropical-nights', 'the-beatles-map', 'elton-john-tour', 'chinese-pavilion-cibulka']);
  assert.deepEqual(researchOrder, ['bivariate-joyplot', 'prague-squared', 'beyond-the-horizon', 'vltava-ii', 'two-centuries-of-railways']);
  assert.deepEqual(homeWork, workOrder.slice(0, 3));
  assert.deepEqual(homeResearch, ['bivariate-joyplot', 'beyond-the-horizon', 'vltava-ii']);
  for (const slug of workOrder) assert.ok(getProject(slug).sections.includes('Work'));
  for (const slug of researchOrder) assert.ok(getProject(slug).sections.includes('Research'));
  assert.deepEqual(workOrder.filter(slug => researchOrder.includes(slug)), ['prague-squared']);
  assert.deepEqual(getProject('joyplot').publications, []);
  assert.equal(getProject('bivariate-joyplot').publications.length, 1);
  assert.equal(getProject('dantes-inferno').interactiveOutputs[0].url, 'https://storymaps.arcgis.com/stories/ad2a09720b75435b922396307e2d6004');
  assert.equal(getProject('chinese-pavilion-cibulka').interactiveOutputs[0].url, 'https://skfb.ly/pNUVq');
  assert.equal(getProject('vltava-ii').interactiveOutputs[0].url, 'https://storymaps.arcgis.com/stories/945c245fcae24ee796371173e3ece15b');
  assert.equal(getProject('two-centuries-of-railways').interactiveOutputs[0].url, 'https://storymaps.arcgis.com/stories/8b9818a23a184da3bf3938391581a0f2');
});

test('external metadata links are valid HTTPS URLs, not placeholders', () => {
  for (const project of projects) {
    const urls = [...project.publications.map(item => item.url), ...project.interactiveOutputs.map(item => item.url), ...project.projectWebsites, ...(project.teachingContext ? [project.teachingContext.url] : [])];
    for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
  }
});

test('iteration two display labels do not discard richer classifications', () => {
  const dante = getProject('dantes-inferno');
  assert.equal(dante.cardLabel, 'Storymapping & Digital Humanities');
  assert.equal(dante.detailSubtitle, 'Storymapping / Digital Humanities');
  assert.equal(dante.type, 'Interactive cartography / digital storytelling / literary cartography');
  assert.equal(dante.interactiveOutputs[0].displayLabel, 'Dante’s Inferno StoryMap');
  const horizon = getProject('beyond-the-horizon');
  assert.equal(horizon.cardLabel, 'Travel networks');
  assert.equal(horizon.type, 'Historical cartography / digital humanities / HGIS / spatial data visualization');
  assert.deepEqual(projects.filter(project => project.cardLabel).map(project => project.slug), ['beyond-the-horizon', 'dantes-inferno', 'vltava-ii', 'two-centuries-of-railways']);
  assert.deepEqual(projects.filter(project => project.detailSubtitle).map(project => project.slug), ['dantes-inferno']);
});

test('StoryMap contributions are foregrounded while research context is preserved', () => {
  const bridge = getProject('vltava-ii');
  const railway = getProject('two-centuries-of-railways');
  assert.equal(bridge.title, 'The Second Life of the Chain Bridge');
  assert.equal(railway.title, 'Tracing the Lost Railway');
  for (const project of [bridge, railway]) {
    assert.equal(project.cardLabel, 'Storymapping');
    assert.equal(project.year, '2023–2027');
    assert.equal(project.extendedNote.length, 2);
    assert.ok(project.shortDescription.startsWith('An interactive StoryMap tracing'));
    assert.ok(project.project && project.funding && project.projectWebsites.length);
  }
  assert.equal(bridge.role, 'StoryMap design');
  assert.equal(railway.role, 'StoryMap design / cartography');
});
