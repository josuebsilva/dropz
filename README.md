# dropz
Jquery dropzone pictures

Example

    <div class="dropz" id="dropz">
        <input name="file" type="file" multiple />
    </div>
    
    Import script 
    <script src="{{ asset('js/dropz.js') }}"></script>
    
    Import style
    <link rel="stylesheet" href="{{ asset('css/dropz.css') }}">
    
    script
    var dropz = new DropZ("#dropz");
