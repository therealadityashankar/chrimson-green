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

this takes in 3 yaml-like parameters, url, width [optional, default 500], height [optional, default 400], that allow the embedding of youtube videos in markdown

#### Example implementation

inside a code block, with language cg-youtube,

````
```cg-youtube
width : 1000
height : 500
url : https://www.youtube.com/watch?v=9g-6RkMpknQ
```
````
