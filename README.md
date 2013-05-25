# What Have I Done?

*Task Management For the Busy*

## Summary

This is a little app I made for several reasons:

1. To track things that I need to do.
2. To remember what I did yesterday.
3. To demonstrate my programming and interaction design style.
4. To try out writing an application in [Meteor.js][meteorjs].

The reason I'd like to keep track of the things I've done is twofold: it makes me feel better when I see that I have accomplished many things; and in the morning meetings at work, I have a nicely compiled list of things that I did the previous day.

I have also been playing around with Meteor.js as a realtime framework, and I wanted to get my hands wet writing an actual app in it

## Installation

    $ curl https://install.meteor.com | /bin/sh
    $ meteor

Navigate to [http://localhost:3000][localhost]

## Caveats

There is no user authentication whatsoever — the only user I expect to load this app is me. If I get unexpected visitors / spambots, or if I simply have the time, I will add basic auth using [Meteor Accounts][meteor-accounts].

## Meteor.js - First Impressions

My first impression of Meteor.js was how delightfully simple it is to store and retrieve data, and that it's neat that the client and server share the same global context. My second impression was that it gets a little confusing to share the same global context for client and server.

I had some trouble serializing model instances before I realized that since they're JSON objects, you cannot store functions. Data only.

The reactive contexts are hard to wrap your head around, and the syntax is weird. I've managed to set up a reactive context in a prototype 2-player Snake game I am working on, but unless you're just doing template data binding, it gets tricky quickly.

When I have a template with no data binding, it keeps re-rendering the template anyway, just because another template bound to a collection is re-rendering.

~~Performance is bad when re-rendering a list — Meteor.js is supposed to use a client-side cache of the Collection to render the list, but it's obviously making a round-trip to the server when I add a record to the tasks collection.~~

Update: Commit [72629df](https://github.com/coopy/meteor-whid/commit/72629df) fixes this - I was waiting for the server to create a document before I inserted it into the collection.

## Contact

You can find me at [sproutlab.com][sproutlab], or email me at [per@sproutlab.com][per-email]

[meteorjs]: http://meteor.com
[meteor-accounts]: http://docs.meteor.com/#accounts_api
[sproutlab]: http://sproutlab.com/per
[per-email]: mailto:per@sproutlab.com
[localhost]: http://localhost:3000
