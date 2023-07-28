import * as client from '@keneanung/iron-realms-nexus-typings';
/**
 * Class for nexus highlight actions
 */
export class HighlightAction implements client.HighlightAction {
    action = 'highlight' as const;
    highlight_fg = '';
    highlight_bg = '';
    highlight: 'match' | 'line' | 'prefix' | 'suffix' | 'backref' = 'match';
    highlight_backref = '';

    constructor(partialHighlightAction: Partial<client.HighlightAction>) {
        if (partialHighlightAction.highlight !== undefined) {
            this.highlight = partialHighlightAction.highlight;
        }

        if(partialHighlightAction.highlight_fg !== undefined){
            this.highlight_fg = partialHighlightAction.highlight_fg;
        }

        if(partialHighlightAction.highlight_bg !== undefined){
            this.highlight_bg = partialHighlightAction.highlight_bg;
        }

        if(partialHighlightAction.highlight_backref !== undefined){
            this.highlight_backref = partialHighlightAction.highlight_backref;
        }
    }
}