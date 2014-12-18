Progressive Enhancement and Graceful Degradation Choices

I didn't have too many CSS bells and whistles such as transitions/animations so I mostly focused on graceful degradation for the lower IEs rather than progressive enhancement.



1. REM for font sizes - I created a mixin within my sass so that I could define the font-size and have it output both px then rem directly below it.

2. Use of images for gradients, typically at my job I would push back against the need for ie8 and below to have gradients but I just kept the mind set that the client was demanding them so I added them in. One could argue ie7/8 are already slow enough but I already miss out on too much sunlight to waste life discussing the pitfalls of IE.

3. HTML5 Video Elements - I used an IE conditional tag to simply add a message state HTML5 was not supported, if this were a production site I would image the videos either being embeded via iframe from youtube/vimeo or be given a flash fall back.

4. Placeholder Support - Within the javascript is a test for whether or not placeholders are supported, if they are not this will add a class to the body so that the hidden label elements for screen readers will be shown next to their inputs since the placeholder was used as a label. This class also controls whether a function will run in the JS but more on that later. I chose not to show the search label because that input had the magnifying glass which I feel signified the point of the input well enough and having a random 'Search' just sitting at the top of the page wasn't very visually pleasing.

5. Data-attributes and style updates - I found a new tidbit of knowledge when using data-attributes, ie7 and ie8 will not redraw CSS when a data attribute has been modified. Since the carousel is completely controlled by these data attributes to hide/show elements it was pretty integral and I did not have the time to go back and rewrite that element. Thus in the javascript there is a check to see if the body has a call of 'no-placeholder', if so then after the data-attributes are updated, i add and immediately remove a class which triggers an ie7/8 redraw. Knowing this now, I would not rely solely on data-attributes to control this carousel. Even though ie9 was redrawing the styles fine, since I already had this logic to add the class I feel it is fine, I would guess there is not a large drop in performance by adding/removing a class on 1 element.

6. Border-box Box Sizing - since ie7 does not support border-box box-sizing, I felt it was best to have this in an ie7 only stylesheet. I decided to have two ie specific style sheets so that ie8 would add a majority of fixes for both ie8 then ie7 can be loaded only when needed for that lowly browser.