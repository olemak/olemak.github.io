# olemak.github.io
Olemak's personal website. Changes a lot, will usually contain tech demos and stuff; maybe a blog at some point.

## Right now, it's a poetry generator!

I found out that The Norwegian Broadcasting Corporation has an open API for all of it's subtitles, and they subtitle everything.
So I figured I could grab a few subtitles and mess with them to make cutup-style pseudo-poetry.

Furthermore, it uses React.js to display the poems and also to switch between different subtitle sources (programmes).
Naturally, the results are very different for the popular teen drama "Skam" ("Shame") or a nature show.

It's all in Norwegian, I mostly did this for fun and learning; I could add more sources and more programmes to the select list at the top of the page, but I don't think that's going to happen.

## Controls: 
There are two UI elements: a reload icon and a drop-down list.
__The Reload Icon__ will compose a new poem from the subtitles already fetched from NRK.
__The Dropdown__ will fetch subtitles for another show and make a poem based on that.

## Browser support
Tested in Chrome, Firefox and Internet Explorer; other browsers should be OK as long as they're not known for iffy javascript implementations.
One caveat for__Internet Explorer__: The NRK subtitles are grabbed from an XML-like format (TTF: Timed Text Format) and parsed, meaning that each paragraph appears as a virtual DOM node at the time of processing, and can be console logged as such. Most browsers will gladly grab the innerHTML of virtual nodes - but not our special friend Internet Explorer. IE will only grab the innerHTML from actual, rendered DOM nodes. So for IE, I had to use the property textContent instead. This is not optimal, because the textContent will simply cut break tags and not replace them with a space. I guess I could, in a loop, create a node for each subtitle element, add it to the DOM, grab the innerHTML of it and then destroy the node again. It would be a pretty hard hit to performance, and in my opinion it is not worth it, so for this simple demo I'll chalk it up to "(semi-)graceful detoriation".

So in IE (and other browsers that act like it) longer text elements will usually have two words mashed together without dividing whitespace. 
