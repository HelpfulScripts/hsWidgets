import { Layout, HsConfig } from './';
import { m, Vnode }         from './mithril';

const myConfig = {
    Layout: {
        rows: ['40px', 'fill'],         // header and main body
        content: [
            { Header: { css:'.header', title: 'Layout Example'}},
            { Main: {
                tiles:  [''],           // main body wiull arrange in tiles
                maxCount: 6,
                leafCSS: 'leaf',
                content: [
                    { Layout: {
                        rows: [''],     // 1st tile: rows of varying columns
                        content: [
                            { aLeaf: { css:'leaf', columns: [' ']}},
                            { aLeaf: { css:'leaf', columns: ['100px'] }},
                            { aLeaf: { css:'leaf', columns: ['100px', '200px'] }},
                            { aLeaf: { css:'leaf', columns: ['100px', 'fill'] }},
                            { aLeaf: { css:'leaf', columns: ['100px', 'fill', '100px'] }},
                            { aLeaf: { css:'leaf', columns: ['20%'] }},
                            { aLeaf: { css:'leaf', columns: ['20%', 'fill'] }},
                            { aLeaf: { css:'leaf', columns: ['20%', 'fill', '20%'] }}
                        ]
                    }},
                    { Layout: {
                        columns: [''],  // 2nd tile: columns of varying rows
                        content: [
                            { aLeaf: { css:'leaf', rows: [' ']}},
                            { aLeaf: { css:'leaf', rows: ['100px'] }},
                            { aLeaf: { css:'leaf', rows: ['100px', '200px'] }},
                            { aLeaf: { css:'leaf', rows: ['100px', 'fill'] }},
                            { aLeaf: { css:'leaf', rows: ['100px', 'fill', '100px'] }},
                            { aLeaf: { css:'leaf', rows: ['20%'] }},
                            { aLeaf: { css:'leaf', rows: ['20%', 'fill'] }},
                            { aLeaf: { css:'leaf', rows: ['20%', 'fill', '20%'] }}
                        ]
                    }},
                    { Layout: {
                        tiles: [''],    // 3rd tile: varying tiles
                        css: 'tile_pct',
                        content: [
                            { aLeaf: { css:'leaf', tiles: [' ']}},
                            { aLeaf: { css:'leaf', tiles: ['40%', 'fill']}},
                            { aLeaf: { css:'leaf', tiles: ['40%']}},
                            { aLeaf: { css:'leaf', tiles: ['40%', '30%', 'fill']}},
                        ]
                    }},
                    { Layout: {
                        tiles: [''],    // 3rd tile: varying tiles
                        css: 'tile_px',
                        content: [
                            { aLeaf: { css:'leaf', tiles: [' ']}},
                            { aLeaf: { css:'leaf', tiles: [' ', 'fill']}},
                            { aLeaf: { css:'leaf', tiles: [' ']}},
                            { aLeaf: { css:'leaf', tiles: [' ']}},
                        ]
                    }}
                ]
            }}
        ]
    }
};
const example = { 
    maxCount: 0,
    Header: class extends Layout {
        getComponents(node: Vnode): Vnode {
            return m(node.attrs.css, node.attrs.title);
        }
    },
    Main: class extends Layout {
        getComponents(node: Vnode): Vnode {
            example.maxCount = node.attrs.maxCount || 3;
            return super.getComponents(node);
        }
    },
    aLeaf: class extends Layout {
        count = 5;
        inc = 1;

        getComponents(node: Vnode): Vnode {
            const dims = node.attrs.columns || node.attrs.rows || node.attrs.tiles;
            let text = '';
            if (node.attrs.columns) { text = 'Columns'; }
            if (node.attrs.rows) { text = 'Rows'; }
            if (node.attrs.tiles) { text = 'Tiles'; }
            const content = [...Array(this.count).keys()].map((c:number) => `${text}<br>${c+1}<br>[${dims.join()}]`);
            return content;
        }
    }
};


const root = window.document.createElement("div");

beforeAll(() => {
    new HsConfig([example]).attachNodeTree(myConfig, root);
});

describe('hsConfig', () => {
    test('HsConfig should match snapshot', () => {
        return expect(root).toMatchSnapshot();
    });
});
