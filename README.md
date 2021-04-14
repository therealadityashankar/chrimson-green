# chrimson-green
webcomponent that makes it easier to write interactive markdown

needs importing of `wc-code` and `markdown-it` via script tags

works in modern browsers

Tags defined:

**chrimson-green**

add this "unsafe" attribute to this tag to allow for inline html i.e.

<chrimson-green unsafe src="..."></chrimson-green>

usage examples:

````html
<chrimson-green><script type=x>
# Here

is 

## some

markdown

```python
def foo():
    print("hi !")

foo()
```
</script></chrimson-green>
````

alternatively

```html
<chrimson-green src="./README.md"></chrimson-green>
```

## Custom markdown implementations

### cg-youtube

a tag to implement youtube videos inside the markdown, this is written the same way programming blocks are written, but with the language set as "cg-youtube"

this takes in yaml-like parameters, 
url, 
width : [optional, default = full width of chrimson green element], 
height : [optional, default = width / (ratio)]
ratio : [optional, default = (1.77777)] // specifies the width:height ratio, has to be a decimal, default 1.7777 = 16:9 aspect ratio

if only the width or height are specified, the other will be calculated via the ratio,
if neither width or height are specified, the width takes up the whole width of the element, and also autoresizes when the width of the element changes

#### Example implementation

inside a code block, with language cg-youtube,

````
```cg-youtube
ratio : 2
url : https://www.youtube.com/watch?v=9g-6RkMpknQ
```
````

sometimes the auto-resizing fails (if anyone can help me debug why, I'd be greatful if someone could helpme debug this, but for that usecase there is a function called ChrimsonGreen.forceYoutubeContentResize() that may be called after the dom content is loaded to fix this
