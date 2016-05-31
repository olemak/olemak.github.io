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
Being a consise little thing, I figured I'd do this without jQuery but I'm sorta regretting that.
Right now, it doesn't work in IE, but I'm working on that.
