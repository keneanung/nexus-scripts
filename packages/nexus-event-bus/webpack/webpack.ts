import { EventBus } from "../src/index"

console.log('loading event bus version [AIV]{version}[/AIV]...')

// Hack to get the Map class back...
if(typeof(Map) !== 'function') {
    const frame = document.createElement('iframe')
    const tab = document.getElementById('tab_content_main_output')
    tab?.appendChild(frame)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    Map = frame.contentWindow.Map
    tab?.removeChild(frame)
}

const eventBus = new EventBus();

export default eventBus;

console.log('event bus loaded.')