# chrimson-green
webcomponent that makes it easier to write interactive markdown

needs importing of `wc-code` and `markdown-it` via script tags

backwards compatibility is laggy, is vulnurable to xss attacks (probably, IDK, I'm programming at 11:59 in the night) if used incorrectly

but works in modern browsers

usage examples:

```html
<chrimson-green><script type=x>
# Here

is 

## some

markdown

you'll have to test how three-backtics and code get changed to interactive
code yourself, since I'm to lazy to think of markdown wierdyness, or run the manual-test.html file in a webserver
</script></chrimson-green>
```

alternatively

```html
<chrimson-green src="./README.md"></chrimson-green>
```
