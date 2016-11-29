# JekyllHelper

This is a small electron app I wrote to expedite the process of writing posts for [algorithms.surge.sh](http://algorithms.surge.sh/).

Since the header for each post follows a tedious format, and each post's file name is similarly tedious to write (year-month-day, etc), it seemed to make sense to have an app that did this for you. Although there are probably jekyll templating workflows out there already, I wanted to get experience making an electron app, and this seemed like a decent opportunity.
 
Currently the app will create a skeleton markdown file in the correct file system location, with post title and tags according to what you enter in a modal, as well as some internal structure that kept popping up in each of my posts. 

It'll also open the file just created in the atom code editor, so that the user can now begin the genuinely interesting part of the writing process. 

### In the future: 

Since the app is built on the base of [this](https://github.com/chentsulin/electron-react-boilerplate) electron boilerplate, it's very extensible. 

I plan to make it possible for the user to write the entire post in this app, and not have to touch an actual code editor. 