# FreeCodeCamp API Basejump: Image Search Abstraction Layer

## User stories:

* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

* I can paginate through the responses by adding a ?offset=2 parameter to the URL.
* I can get a list of the most recently submitted search strings

## Example usage:

```html
https://kevinimgsearch.herokuapp.com/latest/imgsearch
```
```html
https://kevinimgsearch.herokuapp.com/imgsearch/some_search_term?offset=2
```

## Example output:

```json
{ searchTerm: "dog", time: "Fri Jul 22 2016 22:07:51 GMT+0930 (ACST)" }
```
```json
{ url: "http://i.imgur.com/ikzPcK3.gif", alt_text: "Cat fail big time" }
```