# DropZ
Jquery dropzone pictures

![DropZ empty](https://raw.githubusercontent.com/josuebsilva/dropz/master/images/dropz-empty.png)

![DropZ empty](https://raw.githubusercontent.com/josuebsilva/dropz/master/images/dropz-images.png)

Example
```html
<div class="dropz" id="dropz">
    <input name="file" type="file" multiple />
</div>
```
 Import script
```javascript
<script src="js/dropz.js"></script>
```
Import style
```html
<link rel="stylesheet" href="css/dropz.css">
```
script
```javascript
var dropz = new DropZ("#dropz", {
    zoneText:"Drop files here or click." //optional
});
```


# MIT License
